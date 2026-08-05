import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = (props) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleBlogSumbit = async event => {
		event.preventDefault()
		try {
			const newBlog = { title, author, url }
			console.log(newBlog)
			const response = await blogService.create({ title, author, url })
			setTitle('')
			setAuthor('')
			setUrl('')
			props.setNotif({ msg: `made blog ${title} by ${author}`, color: 'green' })
			setTimeout(() => {
				props.setNotif(null)
			}, 5000)
			const newBlogs = props.blogs.concat(newBlog)
			props.setBlogs(newBlogs)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<h2>created new</h2>
			<form onSubmit={handleBlogSumbit}>
				<div>
					<label>
						title:
						<input
							type="text"
							value={title}
							onChange={({ target }) => setTitle(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						author:
						<input
							type="text"
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						url:
						<input
							type="text"
							value={url}
							onChange={({ target }) => setUrl(target.value)}
						/>
					</label>
				</div>
				<button type="submit">submit</button>
			</form>
		</div>
	)
}

export default BlogForm
