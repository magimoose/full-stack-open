const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { initialBlogs, initialUsers, blogsInDb, usersInDb } = require('../utils/test_helper.js')

const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({})

	await api
		.post('/api/users')
		.send(initialUsers[0])
})


test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all users are returned', async () => {
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, 1)
})

test('duplicate username is not created and returns 400', async () => {
	await api
		.post('/api/users')
		.send(initialUsers[0])
		.expect(400)

	const response = await api.get('/api/users')
	assert.strictEqual(response.body.length, 1)
})

test('too short username is not created and returns 400', async () => {
	await api
		.post('/api/users')
		.send(initialUsers[3])
		.expect(400)

	const response = await api.get('/api/users')
	assert.strictEqual(response.body.length, 1)
})

test.only('too short password is not created and returns 400', async () => {
	await api
		.post('/api/users')
		.send(initialUsers[2])
		.expect(400)

	const response = await api.get('/api/users')
	assert.strictEqual(response.body.length, 1)
})
after(async () => {
  await mongoose.connection.close()
})
