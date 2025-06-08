import { useState } from 'react'

import "./blog.css"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none' }  
  
  const toggleDetails = () => {
    setVisible(!visible)
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
        <button style={ hideWhenVisible } onClick={toggleDetails}>show</button>
        <button style={ showWhenVisible } onClick={toggleDetails}>hide</button>
      </p>
      <div className="body" style={ showWhenVisible }>
        <p><a href='{ blog.url }'>{ blog.url }</a></p>
        <p>{blog.author}</p>
        <p>
          likes: { blog.likes }
          <button>like</button>
        </p>
      </div>
    </div>  
  )
}

export default Blog