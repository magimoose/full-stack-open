const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../middleware.js') 


blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user')
	response.json(blogs)
})

blogRouter.post('/', middleware.userExtract, async (request, response) => {
	const user = request.user
  const blog = new Blog({ ...request.body, user: user})
	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', middleware.userExtract, async (request, response) => {
	const id = request.params.id
	const blog = await Blog.findById(id)
	if (!blog) {
		return response.status(404).json({ error: 'blog not found for that id'})
	}
	if (!request.token) {
    return response.status(401).json({ error: 'no token' })
	}
	if (request.user.id !== blog.user.toString()) {
    return response.status(401).json({ error: 'wrong user' })
	}
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

module.exports = blogRouter
