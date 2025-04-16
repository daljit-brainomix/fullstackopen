require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')


const app = express()

// Middleware for parsing JSON content
app.use(express.json())

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use('/api/blogs', blogRouter)

module.exports = app