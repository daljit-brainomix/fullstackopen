// const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
// const User = require('../models/user')
// const { nonExistingId } = require('../tests/api_helper')

// NOTE: async errors are caught by express-async-errors (defined in app.js)

// const getDecodedTokenFromRequest = async (request) => {
//   let decodedToken
//   try {
//     decodedToken = request.token ? jwt.verify(request.token, process.env.SECRET) : null
//   // eslint-disable-next-line no-unused-vars
//   } catch(error) {
//     decodedToken = null
//   }

//   if (!decodedToken || !decodedToken.id) {
//     decodedToken = null
//   }
//   return decodedToken
// }

blogRouter.get('/', async (request, response) => response.json(await Blog.find({}).populate('user', { username: 1, name: 1 })))

blogRouter.post('/', middleware.userExtractor, async (request, response) => {

  const blog = new Blog({ ...request.body, user: request.user.id })

  const savedBlog = await blog.save()

  // Add blog to user.blogs array
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()

  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
  response.status(201).json(populatedBlog)
})

blogRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const { likes } = request.body
  const blogToUpdate = await Blog.findById(request.params.id)

  if(!blogToUpdate) {
    return response.status(404).end()
  }

  blogToUpdate.likes = likes

  const savedBlog = await blogToUpdate.save()
  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
  response.json(populatedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const blogToDelete = await Blog.findById(request.params.id)

  if (!blogToDelete) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blogToDelete.user.toString() !== request.user.id) {
    return response.status(401).json({ error: 'user not authorized to delete this blog' })
  }

  await blogToDelete.deleteOne()

  response.status(204).end()
})

module.exports = blogRouter