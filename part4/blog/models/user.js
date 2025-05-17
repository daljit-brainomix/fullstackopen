const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true // this ensures the uniqueness of username
    //Be careful - If there are already documents in the database that violate the uniqueness condition, no index will be created
    // Mongoose validations do not detect the index violation, and instead of ValidationError they return an error of type MongoServerError
  },
  name: {
    type: String
  },
  passwordHash: {
    type: String
  },
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User