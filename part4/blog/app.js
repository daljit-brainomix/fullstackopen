const express = require('express')
const mongoose = require('mongoose')

const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const app = express()

logger.info(`Connecting to ${config.MONGODB_URI}`)
// Connect to DB
mongoose.connect(config.MONGODB_URI)
.then(()=> logger.info('Connected to MongoDB'))
.catch(() => logger.error('Failed to conenct to MongoDB'))

// Middleware to load FE
app.use(express.static('dist'))
// Middleware to parse JSON content
app.use(express.json())
// Middleware to log requests
app.use(middleware.requestLogger)

// Register API routes
app.use('/api/blogs', blogRouter)

// Handle un-registered routes
app.use(middleware.unknownEndpoint)
// Handle application errors gracefully
app.use(middleware.errorHandler)


module.exports = app