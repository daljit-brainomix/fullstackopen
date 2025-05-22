const mongoose = require('mongoose')
const User = require('../models/user')

const initialUsers = [
  {
    username: 'michaelchan',
    name: 'Michael Chan',
    passwordHash: '$2b$10$ilnruiQXSMtt8cymyBMiiuxh8xR1ER8V6.ejjhohvOuQPZxtzw78C' //fullstackopen
  }
]
const nonExistingId = async () => {
  return new mongoose.Types.ObjectId()
}

const usersInDb = async (query = {}) => {
  const users = await User.find(query)
  return users.map(user => user.toJSON())
}

module.exports = { initialUsers, usersInDb, nonExistingId }