import React, { useState } from 'react'
import blogService from '../services/blogs'
import propTypes from 'prop-types'

const Blog = ({ blog, token }) => {
  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes+1,
      user: blog.user.id,
    }
    console.log(blogObject)
    try{
      const res = await blogService.update(blog.id, blogObject)
      console.log(res)
      setLikes(likes+1)
    }catch(e){
      console.log('error: ', e)
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog: ${blog.name} from ${blog.author}`)) {
      try{
        const res = await blogService.remove(blog.id, token)
        console.log(res)
        window.location.reload(false)
      }catch(e){
        console.log('error: ', e)
      }
    }
  }

  return(
    <div style={blogStyle}>
      {!showAll ?
        <div>
          {blog.title} {blog.author} <button id="viewButton" onClick={() => setShowAll(true)} >view</button>
        </div>
        :
        <div className='expand'>
          {blog.title} {blog.author} <button onClick={() => setShowAll(false)}>hide</button><br/>
          {blog.url}<br/>
          <span className='likes'>{likes}</span> <button onClick={handleLike}>like</button><br />
          {blog.user.username}
          {blog.user.name === localStorage.getItem('name') ?
            <button onClick={handleRemove}>remove</button>
            :
            <p></p>}

        </div>}
    </div>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  token: propTypes.string
}

export default Blog