const TEST_MODE = process.env.NODE_ENV === 'test'

const info = (...params) => {
  if(!TEST_MODE) {
    console.log(...params)
  }
}

const error = (...params) => {
  if(!TEST_MODE) {
    console.error(...params)
  }
}

module.exports = { info, error }