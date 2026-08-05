const User = require('../models/user')
const Blog = require('../models/blog')

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

const initialUsers = [
  {
		name: "bruh",
		username: "bruh",
		password: "bruh"
  },
  {
		name: "bruh",
		username: "uhhh",
		password: "bruh"
  },
	{
		name: "bruh",
		username: "buuu",
		password: "bu"
	},
	{
		name: "bruh",
		username: "bu",
		password: "bububub"
	}
]


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(u => u.toJSON())
}

module.exports = {
	initialBlogs,
	initialUsers,
  blogsInDb,
  usersInDb,
}
