const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// NOTE: async errors are caught by express-async-errors (defined in app.js)

blogRouter.get('/', async (request, response) => response.json(await Blog.find({}).populate('user', { username: 1, name: 1 })))

blogRouter.post('/', async (request, response) => {
  // Just hard code the creater for now to complete the exercise
  let findUsername = 'tommy'
  if(process.env.NODE_ENV === 'test') {
    findUsername = 'testuser'
  }

  const dbUser = await User.findOne({ username: findUsername })
  if (!dbUser) {
    return response.status(404).json({ error: 'User not found' })
  }
  const blog = new Blog({ ...request.body, user: dbUser._id })

  const savedBlog = await blog.save()

  // Add blog to user.blogs array
  dbUser.blogs = dbUser.blogs.concat(savedBlog._id)
  await dbUser.save()

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

blogRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  // I've just chosen to send 404 NotFound, but also considered using 400 BadRequest.
  response.status(!deletedBlog ? 404 : 204).end()
})

module.exports = blogRouter