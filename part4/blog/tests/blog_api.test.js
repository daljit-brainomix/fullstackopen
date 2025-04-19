const { after, beforeEach, describe, test } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const helper = require('./api_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('blogs api', () => {
  test('returns json data', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('has unique identifier named id', async () => {
    const blogsData = await helper.blogsInDb()

    assert('id' in blogsData[0])
  })
  test('creates new blog successfully', async () => {
    const newBlog = {
      title: 'Full Stack Open',
      author: 'Matti Luukkainen',
      url: 'https://fullstackopen.com/en/',
      likes: 1000000
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAdding = await helper.blogsInDb()
    assert.strictEqual(blogsAfterAdding.length, helper.initialBlogs.length + 1)

    const blogTitles = blogsAfterAdding.map((blog) => blog.title)
    assert(blogTitles.includes(newBlog.title))
  })

})


// https://nodejs.org/api/test.html#afterfn-options
after(async () => await mongoose.connection.close())
