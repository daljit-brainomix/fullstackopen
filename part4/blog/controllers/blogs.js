const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// NOTE: async errors are caught by express-async-errors (defined in app.js)

blogRouter.get('/', async (request, response) => response.json(await Blog.find({})))

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  // I've just chosen to send 404 NotFound, but also considered using 400 BadRequest.
  response.status(!deletedBlog ? 404 : 204).end()
})

module.exports = blogRouter