const { after, beforeEach, describe, test } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const helper = require('./api_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)

  await Blog.deleteMany({})
  await Blog.insertMany(await helper.initialBlogsWithUser())
})

describe('when there are initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog posts are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  describe('viewing a specific blog', () => {

    test('has unique identifier named id', async () => {
      const blogsData = await helper.blogsInDb()
      assert('id' in blogsData[0])
    })

  })

  describe('adding a new blog', () => {

    test('creates new blog successfully', async () => {
      const newBlog = {
        title: 'Full Stack Open',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com/en/',
        likes: 1000000
      }

      await api
        .post('/api/blogs').send(newBlog).expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAfterAdding = await helper.blogsInDb()
      assert.strictEqual(blogsAfterAdding.length, helper.initialBlogs.length + 1)

      const blogTitles = blogsAfterAdding.map((blog) => blog.title)
      assert(blogTitles.includes(newBlog.title))
    })

    test('sets likes to zero when it is missing', async () => {
      const newBlog = {
        title: 'A great blog by someone',
        author: 'Nnagi Noya',
        url: 'https://greatblogs.com/en/',
      }

      const apiResponse = await api.post('/api/blogs').send(newBlog).expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAfterAdding = await helper.blogsInDb()
      assert.strictEqual(blogsAfterAdding.length, helper.initialBlogs.length + 1)

      assert.strictEqual(apiResponse.body.likes, 0)

      const blogByNnagi = await helper.blogsInDb({ author: 'Nnagi Noya' })
      assert.strictEqual(blogByNnagi[0].likes, 0)
    })

  })

  describe('validation of blog data', () => {

    test('fails with status code 404 when the url is missing', async () => {
      const newBlog = {
        title: 'Blog missing the URL',
        author: 'Some Author',
      }

      await api.post('/api/blogs').send(newBlog).expect(400)
    })

    test('fails with status code 404 when the title is missing', async () => {
      const newBlog = {
        author: 'Some Author',
        url: 'https://www.google.com/'
      }

      await api.post('/api/blogs').send(newBlog).expect(400)
    })
  })

  describe('deletion of a blog', () => {

    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAfterDeletion = await helper.blogsInDb()

      assert.strictEqual(blogsAfterDeletion.length, blogsAtStart.length - 1)

      assert(!blogsAfterDeletion.map((blog) => blog.title).includes(blogToDelete.title))
    })

    test('fails with 404 for a non-existing id', async () => {
      const nonExistingId = await helper.nonExistingId()
      await api.delete(`/api/blogs/${nonExistingId}`).expect(404)
    })

    test('fails with 400 for an invalid id', async () => {
      const invalidId = '2343sfsd'
      await api.delete(`/api/blogs/${invalidId}`).expect(400)
    })

  })
  describe('updation of a blog', () => {

    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const updateData = { likes: 15 }

      await api.put(`/api/blogs/${blogToUpdate.id}`).send(updateData).expect(200)

      const blogsAfterUpdation = await helper.blogsInDb()
      const updatedBlog = blogsAfterUpdation.find(b => b.id === blogToUpdate.id)

      assert.strictEqual(updatedBlog.likes, 15)
    })

    test('fails with 404 for a non-existing id', async () => {
      const nonExistingId = await helper.nonExistingId()
      await api.put(`/api/blogs/${nonExistingId}`).expect(404)
    })

    test('fails with 400 for an invalid id', async () => {
      const invalidId = '2343sfsd'
      await api.put(`/api/blogs/${invalidId}`).expect(400)
    })

  })
})

// https://nodejs.org/api/test.html#afterfn-options
after(async () => await mongoose.connection.close())
