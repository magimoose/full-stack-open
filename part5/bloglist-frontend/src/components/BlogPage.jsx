import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import { useState, useEffect } from 'react'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const BlogPage = (props) => {
  const [blogs, setBlogs] = useState([])

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
			<BlogForm setNotif={props.setNotif} blogs={blogs} setBlogs={setBlogs}/>
			<div>      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
			</div>
    </div>
	)
}

export default BlogPage
