const _ = require('lodash')

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

const mostBlogs = (blogs) => {
  if(blogs.length === 0) {
    return null
  }

  const authorCount = {}
  blogs.forEach(blog => {
    authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
  })

  const reducer = (popularAuthor, currentAuthorArr) => {
    const [author, count] = currentAuthorArr
    return count > popularAuthor.count ? { author: author, count: count } : popularAuthor
  }
  return Object.entries(authorCount).reduce(reducer, { author: null, count: 0 })
}

const mostBlogsLodash = (blogs) => {
  if(blogs.length === 0) {
    return null
  }

  const authorCount = _.countBy(blogs, 'author')
  const maxAuthorName = _.maxBy(Object.keys(authorCount), author => authorCount[author])
  return { author: maxAuthorName, count: authorCount[maxAuthorName] }
}

const mostLikedAuthor = (blogs) => {
  if(blogs.length === 0) {
    return null
  }

  // const authorLiked = {}
  // blogs.forEach(blog => {
  //   authorLiked[blog.author] = (authorLiked[blog.author] || 0) + blog.likes
  // })

  const authorLikes = _.map(_.groupBy(blogs, 'author'), (authorBlogs, authorName) => {
    // return { 'author': authorName, 'likes': authorBlogs.reduce((blogLikes, blog) => blogLikes + blog.likes, 0) }
    return { 'author': authorName, 'likes': _.sumBy(authorBlogs, 'likes') }
  })
  return _.maxBy(authorLikes, 'likes')
}


module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostBlogsLodash, mostLikedAuthor }