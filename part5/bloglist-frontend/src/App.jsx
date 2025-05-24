import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    console.log("Logging in with", username, password)

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  return (
    <div>
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
            <p>{user.name} logged-in</p>
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