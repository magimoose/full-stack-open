const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { initialBlogs, initialUsers, blogsInDb, usersInDb } = require('../utils/test_helper.js')

const api = supertest(app)

describe('when blog db is empty', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(initialUsers[0].password, 10)
    const user = new User({ name: initialUsers[0].name, username: initialUsers[0].username, passwordHash })

    const passwordHash1 = await bcrypt.hash(initialUsers[1].password, 10)
    const user1 = new User({ name: initialUsers[1].name, username: initialUsers[1].username, passwordHash: passwordHash1 })

    await user.save()
		await user1.save()
  })

	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('added blog goes to the db', async () => {
		const blog = initialBlogs[0]
		const user = await User.findOne({ username: initialUsers[0].username })
		const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)
		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(blog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		assert.strictEqual(response.body.length, 1)
	})
		
	test('posting blogs returns 401 if no token', async () => {
		const blog = initialBlogs[0]
		await api
			.post('/api/blogs')
			.send(blog)
			.expect(401)
			.expect('Content-Type', /application\/json/)

	})

})

describe('when blog db is not empty', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(initialUsers[0].password, 10)
    const user = new User({ name: initialUsers[0].name, username: initialUsers[0].username, passwordHash })

    const passwordHash1 = await bcrypt.hash(initialUsers[1].password, 10)
    const user1 = new User({ name: initialUsers[1].name, username: initialUsers[1].username, passwordHash: passwordHash1 })
    await user.save()
		await user1.save()

		const blog = new Blog({ ...initialBlogs[0], user: user })
		await blog.save()
  })


	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')
		assert.strictEqual(response.body.length, 1)
	})

	test('blogs have unqiue id named id', async () => {
		const response = await api.get('/api/blogs')
		response.body.forEach(async (blog) => {
			assert('id' in blog && !('_id' in blog))
		})
	})

	test('if likes in not included default to 0', async () => {
		const blog = initialBlogs[0]
		delete blog.likes

		const user = await User.findOne({ username: initialUsers[0].username })
		const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)

		const response = await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(blog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		assert.strictEqual(response.body.likes, 0)
	})

	test('if no url then 400', async () => {
		const blog = { ...initialBlogs[1] }
		delete blog.url

		const user = await User.findOne({ username: initialUsers[0].username })
		const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(blog)
			.expect(400)
	})

	test('if no title then 400', async () => {
		const blog = { ...initialBlogs[0] }
		delete blog.title

		const user = await User.findOne({ username: initialUsers[0].username })
		const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)

		const response = await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(blog)
			.expect(400)
	})

	test('deleting a blog works', async () => {
		const response = await api.get('/api/blogs')
		const id = response.body[0].id
		const user = await User.findOne({ username: initialUsers[0].username })
		const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)
		await api
			.delete(`/api/blogs/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(204)
		const after_response = await api.get('/api/blogs')
		assert.strictEqual(after_response.body.length, 0)
	})


	test('deleting with wrong id returns 400', async () => {
		const user = await User.findOne({ username: initialUsers[0].username })
		const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)
		await api
			.delete('/api/blogs/bruh').expect(400)
			.set('Authorization', `Bearer ${token}`)
	})

	test('deleting as wrong user returns 401', async () => {
		const response = await api.get('/api/blogs')
		const id = response.body[0].id
		const user = await User.findOne({ username: initialUsers[1].username })
		const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)
		await api
			.delete(`/api/blogs/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(401)
	})


})

after(async () => {
  await mongoose.connection.close()
})
