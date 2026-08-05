import { useState, useEffect } from 'react'
import Notification from './components/Notification.jsx'
import BlogPage from './components/BlogPage'
import LoginPage from './components/LoginPage.jsx'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('ee') 
  const [password, setPassword] = useState('ee') 
	const [user, setUser] = useState(null)
	const [notif, setNotif] = useState(null)

	useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

	const handleLogin = async event => {    
		event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
			blogService.setToken(user.token)
			window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
		} catch (error) {
			console.log(error.response.data.error);
      setNotif({ msg: 'wrong creds', color: 'red' })
      setTimeout(() => {
        setNotif(null)
      }, 5000)
    }  
	}

	const handleLogout = () => {
		window.localStorage.setItem(
			'loggedBlogappUser', null
		)
		blogService.setToken(null)
		setUser(null)
	}

  return (
		<div>
			<Notification notif={notif}/>
			{!user &&
		<LoginPage handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
			}
			{user && <BlogPage user={user} handleLogout={handleLogout} setNotif={setNotif}/>}
	</div>
  )
}

export default App
