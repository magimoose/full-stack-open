const userRouter = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response) => {
	const { name, username, password } = request.body
	if (password.length < 3) {
		response.status(400).json({error: "password is too short"}).end()
		return
	}
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)
	const user = new User({ name: name, username: username, passwordHash: passwordHash })
	const savedUser = await user.save()
	response.status(201).json(savedUser)
})


userRouter.get('/', async (request, response) => {
	const users = await User.find({})
	response.json(users)
})


module.exports = userRouter
