const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
  const authHeader = request.get('authorization')

  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    // Insted of .replace('Bearer ', '') using slice to avoid any case-sensitivity issues.
    request.token = authHeader.slice(7).trim()
  } else {
    request.token = null
  }

  next()
}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body ? request.body : '(empty)')
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  let statusCode = 0
  let message = {}

  if (error.name === 'CastError') {
    statusCode = 400
    message = { error: 'malformatted id' }
  } else if (error.name === 'ValidationError') {
    statusCode = 400
    message = { error: error.message }
  } else if (error.name ===  'JsonWebTokenError') {
    statusCode = 401
    message = { error: 'token invalid' }
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401
    message = { error: 'token expired' }
  }

  if (statusCode > 0) {
    return response.status(statusCode).json(message)
  }
  next(error)
}

module.exports = {
  errorHandler,
  requestLogger,
  tokenExtractor,
  unknownEndpoint
}