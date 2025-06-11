import { useState } from 'react'

import "./blog.css"

const Blog = ({ blog, blogLikeHandler }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none' }  
  
  const toggleDetails = () => {
    setVisible(!visible)
  }

  const addLike = async (event) => {
    console.log("Liking the blog ...")
    event.preventDefault()
    try {
      const updatedBlogData = await blogLikeHandler(blog)
    } catch(error) {
      console.error('Error:', error.response ? error.response.data : error.message)
      throw error // caller must use try/catch
    }
  }

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  return (
    <div className="blog">
      <p className="title">
        { blog.title }
        <button style={ hideWhenVisible } onClick={ toggleDetails }>show</button>
        <button style={ showWhenVisible } onClick={ toggleDetails }>hide</button>
      </p>
      <div className="body" style={ showWhenVisible }>
        <p><a href='{ blog.url }' target='_blank'>{ blog.url }</a></p>
        <p>{blog.author}</p>
        <p>
          likes: { blog.likes }
          <button onClick={ addLike }>like</button>
        </p>
        <p><small>Created by: { blog.user.username }</small></p>
      </div>
    </div>  
  )
}

export default Blog