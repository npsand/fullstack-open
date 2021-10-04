import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState()
  const [name, setName] = useState()
  const [password, setPassword] = useState()

  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const createFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const login = async(event) => {
    event.preventDefault()
    try{
      const res = await loginService.login({ username: username,password: password })
      setUser(res.token)
      setName(res.name)
      localStorage.setItem('user', res.token)
      localStorage.setItem('name', res.name)
      blogService.setToken(res.token)
    }catch(e){
      setIsError(true)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async(blogObject) => {
    createFormRef.current.toggleVisibility()
    const loggedUser = localStorage.getItem('user')
    try{
      const res = await blogService.add(blogObject, loggedUser)
      setBlogs(blogs.concat(blogObject))
      console.log(res)
      setIsError(false)
      setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(e){
      setIsError(true)
      setErrorMessage('error occured when adding blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  if (user === null && localStorage.getItem('user') === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage}  error={isError}/>
        <form onSubmit={login}>
          username: <input id='username' type="text"  onChange={handleUsernameChange} />
          <br />
          password: <input id='password' type="password" onChange={handlePasswordChange}/>
          <br />
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} error={isError} />

      <p>{name ? name : localStorage.getItem('name')} is logged in<button onClick={() => {localStorage.clear(); window.location.reload(false)}}>logout</button></p>

      <Togglable buttonLabel={'create new blog'} ref={createFormRef}>
        <CreateForm createBlog={addBlog} />
      </Togglable>

      <div id="blogs">
        {blogs.sort((a,b) => a.likes > b.likes ? -1 : 1).map(blog =>
          <Blog className='blog' key={blog.id} blog={blog} token={localStorage.getItem('user')} />
        )}
      </div>
    </div>
  )
}

export default App