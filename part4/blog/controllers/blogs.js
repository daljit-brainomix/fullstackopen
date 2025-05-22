const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

// NOTE: async errors are caught by express-async-errors (defined in app.js)

const getDecodedTokenFromRequest = async (request) => {
  let decodedToken
  try {
    decodedToken = request.token ? jwt.verify(request.token, process.env.SECRET) : null
  // eslint-disable-next-line no-unused-vars
  } catch(error) {
    decodedToken = null
  }

  if (!decodedToken || !decodedToken.id) {
    decodedToken = null
  }
  return decodedToken
}

blogRouter.get('/', async (request, response) => response.json(await Blog.find({}).populate('user', { username: 1, name: 1 })))

blogRouter.post('/', middleware.userExtractor, async (request, response) => {

  // const decodedToken = await getDecodedTokenFromRequest(request)
  // if (!decodedToken || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }

  // // decodedToken contents are { username: 'tommy', id: '6829063fdcd164268b3a64c9', iat: 1747590081 } where id is user's id.
  // const dbUser = await User.findById(decodedToken.id)
  // if (!dbUser) {
  //   return response.status(404).json({ error: 'UserId missing or not valid' })
  // }

  const blog = new Blog({ ...request.body, user: request.user.id })

  const savedBlog = await blog.save()

  // Add blog to user.blogs array
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()

  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
  response.status(201).json(populatedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const blogToUpdate = await Blog.findById(request.params.id)

  if(!blogToUpdate) {
    return response.status(404).end()
  }

  blogToUpdate.likes = likes

  const updatedBlog = await blogToUpdate.save()
  response.json(updatedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  // const decodedToken = await getDecodedTokenFromRequest(request)
  // if (!decodedToken || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }

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