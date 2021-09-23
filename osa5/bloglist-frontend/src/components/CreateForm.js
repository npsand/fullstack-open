import React, { useState } from 'react'
import propTypes from 'prop-types'

const CreateForm = ({ createBlog }) => {
  const[title, setTitle] = useState()
  const[author, setAuthor] = useState()
  const[url, setUrl] = useState()

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title, author: author, url: url
    })
  }

  return(
    <div>
      <h2>create new</h2>
      <form className='createForm' onSubmit={addBlog}>
                title: <input className='title' type="text" onChange={handleTitleChange} />
        <br />
                author: <input className='author' type="text" onChange={handleAuthorChange}/>
        <br />
                url: <input className='url' type="text" onChange={handleUrlChange}/>
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  createBlog: propTypes.func.isRequired
}

export default CreateForm