import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const loadBlogs = async () => {
    console.log(`Loading new blogs ... ${new Date()}`)
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )    
  }

  useEffect(() => {
    // The useEffect callback itself cannot be async, but it’s perfectly fine to call an async function inside it,
    // React expects the useEffect callback to return either nothing or a cleanup function, not a Promise. 
    // An async function always returns a Promise, which breaks that contract.
    loadBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])
  
  const showNotification = (message, type) => {
    setNotificationMessage({text: message, type: type})
    setTimeout(() => setNotificationMessage(null), 5000)
  }
  
  const handleBlogFormSubmit = async (blogFormData) => {
    // event.preventDefault()
    console.log('Submitting blog form data', blogFormData)
    
    await blogService.setAuthToken(user.token)
    
    try {
      await blogService.createBlog(blogFormData)
      showNotification('Blog created successfully!', 'success')      
      // setNotes(notes.concat(returnedNote))
      blogFormRef.current.toggleVisibility()
      await loadBlogs()
    } catch (error) {
      showNotification(`Error: ${error.response?.data?.error || error.message}`, 'error')
    }        
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      showNotification('Wrong credentials', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    showNotification('You are logged out now.', 'success')
  }

  return (
    <div>
      <Notification message={notificationMessage} />

      <h2>Login</h2>
      {
        user === null ?
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          /> :
          <div>
            <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>            

            <br />
            <Togglable buttonLabel="New note" ref={blogFormRef}>
              <h2>Create new</h2>
              <BlogForm blogFormSubmit={handleBlogFormSubmit} />
            </Togglable>   
          </div>
      }
      <hr />
      <h2>blogs</h2>      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App