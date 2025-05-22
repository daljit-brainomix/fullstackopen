// const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')

const nonExistingId = async () => {
  // a MongoDB native ObjectId
  return new mongoose.Types.ObjectId()
}

// const getPasswordHash = async (password) => {
//     const saltRounds = 10
//     const passwordHash = await bcrypt.hash(password, saltRounds)
//     return passwordHash
// }

const initialUsers = [
  {
    username: 'testuser',
    name: 'Test User',
    passwordHash: '$2b$10$ilnruiQXSMtt8cymyBMiiuxh8xR1ER8V6.ejjhohvOuQPZxtzw78C' //fullstackopen
  }
]

const usersInDb = async (query = {}) => {
  const users = await User.find(query)
  return users.map(user => user.toJSON())
}

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
]

const initialBlogsWithUser = async () => {
  const users = await usersInDb()
  const firstUser = users[0]

  return initialBlogs.map(blog => ({
    ...blog,
    user: firstUser.id,
  }))
}

const blogsInDb = async (query = {}) => {
  const blogs = await Blog.find(query)
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  initialBlogsWithUser,
  blogsInDb,
  nonExistingId,
  initialUsers,
  usersInDb,
}