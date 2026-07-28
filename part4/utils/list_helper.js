const _ = require('lodash')

const totalLikes = (blogs) => {
	return blogs.reduce((total, curr) => total + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
	return blogs.reduce((best, curr) => curr.likes > best.likes ? curr : best)
}

const mostBlogs = (blogs) => {
	const grouped = _.groupBy(blogs, 'author')
	const mostAuthor = _.maxBy(Object.keys(grouped), author => grouped[author].length)
	return {author: mostAuthor, blogs: grouped[mostAuthor].length}
}

const mostLikes = (blogs ) => {
	const grouped = _.groupBy(blogs, 'author')
	const mostAuthor = _.maxBy(Object.keys(grouped), author => _.sumBy(grouped[author], blog => blog.likes))
	return {author: mostAuthor, likes: _.sumBy(grouped[mostAuthor], blog => blog.likes)}
}
module.exports = {
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
