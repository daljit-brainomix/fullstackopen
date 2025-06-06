const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const { requireMinLength } = require('../utils/validators')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => response.json(await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })))

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  requireMinLength('password', password, 3)

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter