const createValidationError = (message) => {
  const error = new Error(message)
  error.name = 'ValidationError'
  return error
}

const requireMinLength = (field, value, minLength) => {
  if (!value || value.length < minLength) {
    throw createValidationError(`${field} must be at least ${minLength} characters long`)
  }
}

module.exports = {
  requireMinLength,
}
