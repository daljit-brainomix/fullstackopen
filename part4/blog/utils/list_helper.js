const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((blogLikes, blog) => {
    return blogLikes + blog.likes
  }, 0)
}

module.exports = { dummy, totalLikes }