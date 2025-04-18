const { after, beforeEach, describe, test } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)
const app = require('../app')
const helper = require('./test_helper')

beforeEach(async () => {
// Some code here
})

describe('blogs api', () => {
  test('returns json data', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})


// https://nodejs.org/api/test.html#afterfn-options
after(async () => await mongoose.connection.close())
