const { test, describe } = require('node:test')
const assert = require('node:assert')

const average = require('../utils/for_testing').average

describe('average', () => {
  test('of one value is the value itself', () => {
    assert.strictEqual(average([1]), 1)
  })
  test('of many values is calculated correctly', () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
  })
  test('of an empty array is zero', () => {
    assert.strictEqual(average([]), 0)
  })
})