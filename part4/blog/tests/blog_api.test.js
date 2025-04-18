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

})


// https://nodejs.org/api/test.html#afterfn-options
after(async () => await mongoose.connection.close())
