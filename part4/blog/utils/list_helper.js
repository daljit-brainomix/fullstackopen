const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((blogLikes, blog) => {
    return blogLikes + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (mostLikedBlog, currentBlog) => {
    return currentBlog.likes > mostLikedBlog.likes ? currentBlog : mostLikedBlog
  }
  return blogs.length === 0 ? null : blogs.reduce(reducer)
}

module.exports = { dummy, totalLikes, favoriteBlog }