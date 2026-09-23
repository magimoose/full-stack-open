import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import { useState, useEffect } from 'react'

const Blog = ({ initialBlog, user, deleteOneBlog }) => {
	const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
	const [detailsVisible, setDetailsVisible] = useState(false)
	const [blog, setBlog] = useState(initialBlog)

	const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
	const showWhenVisible = { display: detailsVisible ? '' : 'none' }

	const showDelete = { display: (blog.user && (blog.user.username == user.username)) ? '' : 'none'}

	const likeBlog = () => {
		const newBlog = { ...blog, likes: blog.likes + 1 }
		blogService.update(blog.id, newBlog).then(response => {
			console.log(response)
			setBlog(newBlog)
		}
		)
	}

  return (<div style={blogStyle}>
		<div style={showWhenVisible}>
			{blog.title}
			<button onClick={() => setDetailsVisible(false)}>hide</button>
			<div>{blog.url}</div>
			<div>likes {blog.likes} <button onClick={() => likeBlog()}>like</button></div>
			<div>{blog.author}</div>
			<button style={showDelete} onClick={() => deleteOneBlog(blog.id)}>delete</button>
		</div>
		<div style={hideWhenVisible}>
			{blog.title}
			<button onClick={() => setDetailsVisible(true)}>view</button>
		</div>
  </div> ) 
}

const BlogPage = (props) => {
  const [blogs, setBlogs] = useState([])
	const [formVisible, setFormVisible] = useState(false)

	const hideWhenVisible = { display: formVisible ? 'none' : '' }
	const showWhenVisible = { display: formVisible ? '' : 'none' }

	const deleteOneBlog = id => {
		if (confirm('test')) {
		blogService.deleteBlog(id).then(() => 
			setBlogs(blogs.filter(blog => blog.id !== id).sort((a,b) => a.likes - b.likes))
		)
		}
	}

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h2>blogs</h2>
			<>logged in as {props.user.name}</>
			<button onClick={() => props.handleLogout()}>logout</button>
			<div style={showWhenVisible}>
				<BlogForm setNotif={props.setNotif} blogs={blogs} setBlogs={setBlogs}/>
				<button onClick={() => setFormVisible(false)}>cancel</button>
			</div>
			<div style={hideWhenVisible}>
				<button onClick={() => setFormVisible(true)}>create new blog</button>
				{blogs.map(blog => <Blog key={blog.id} initialBlog={blog} user={props.user} deleteOneBlog={deleteOneBlog}/>)}
			</div>
    </div>
	)
}

export default BlogPage
