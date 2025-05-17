const { after, beforeEach, describe, test } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./users_api_helper')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('adding a new user', () => {

  test('creates new user successfully', async () => {
    const newUser = {
      username: 'fullstackopen',
      name: 'Full Stack Open',
      password: 'topsecret'
    }

    await api
      .post('/api/users').send(newUser).expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterAdding = await helper.usersInDb()
    assert.strictEqual(usersAfterAdding.length, helper.initialUsers.length + 1)

    const names = usersAfterAdding.map((user) => user.name)
    assert(names.includes(newUser.name))
  })

})

describe('validation of user data', () => {

  test('fails with status code 400 when the usename is missing', async () => {
    const newUser = {
      name: 'Arther Stone',
    }
    await api.post('/api/users').send(newUser).expect(400)
  })
  test('fails with status code 400 when the usename is shorter than required length', async () => {
    const newUser = {
      username: 'ar',
      name: 'Arther Stone',
    }
    await api.post('/api/users').send(newUser).expect(400)
  })
  test('fails with status code 400 when the password is missing', async () => {
    const newUser = {
      username: 'arther',
      name: 'Arther Stone',
    }
    await api.post('/api/users').send(newUser).expect(400)
  })
  test('fails with status code 400 when the password is shorter than required length', async () => {
    const newUser = {
      username: 'arther',
      name: 'Arther Stone',
      password: 'ab'
    }
    await api.post('/api/users').send(newUser).expect(400)
  })
})

// https://nodejs.org/api/test.html#afterfn-options
after(async () => await mongoose.connection.close())
