const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
  {
		title: "bluh",
		author: "person",
		url: "dam",
		likes: 2
  },
  {
		title: "blh",
		author: "prson",
		url: "da",
		likes: 2
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 2)
})

test('blogs have unqiue id named id', async () => {
  const response = await api.get('/api/blogs')
	response.body.forEach(async (blog) => {
		assert('id' in blog && !('_id' in blog))
	})
})

test('added blog goes to the db', async () => {
	const blog = initialBlogs[0]
	await api
		.post('/api/blogs')
		.send(blog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')
	assert.strictEqual(response.body.length, 3)
})

test('if likes in not included default to 0', async () => {
	const blog = initialBlogs[0]
	delete blog.likes

	const response = await api
		.post('/api/blogs')
		.send(blog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	assert.strictEqual(response.body.likes, 0)
})

test('if no title then 400', async () => {
	const blog = { ...initialBlogs[0] }
	delete blog.title

	const response = await api
		.post('/api/blogs')
		.send(blog)
		.expect(400)

})

test('if no url then 400', async () => {
	const blog = { ...initialBlogs[1] }
	delete blog.url

	await api
		.post('/api/blogs')
		.send(blog)
		.expect(400)
})

test('deleting works', async () => {
  const response = await api.get('/api/blogs')
	const id = response.body[0].id
	await api.delete(`/api/blogs/${id}`).expect(204)
	const after_response = await api.get('/api/blogs')
	assert.strictEqual(after_response.body.length, 1)
})

test('deleting with wrong id returns 400', async () => {
	await api.delete('/api/blogs/bruh').expect(400)
})

after(async () => {
  await mongoose.connection.close()
})
