const User = require('./models/user')
const jwt = require('jsonwebtoken')

const tokenExtract = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
		request.token = authorization.replace('Bearer ', '')
	}
	next()
}	

const userExtract = async (request, response, next) => {
	if (!request.token) {
		return response.status(401).json({ error: 'no token'})
	}
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken) {
		return response.status(401).json({ error: 'invalid token'})
	}
  const user = await User.findById(decodedToken.id)
	if (!user) {
		return response.status(401).json({ error: 'no user for that token' })
	}
	request.user = user
	next()
}

module.exports = { tokenExtract, userExtract }
