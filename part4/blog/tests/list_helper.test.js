const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {
  test('of an empty blog list are zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })
  test('are the same number of likes of the single blog item in the blog list', () => {
    assert.strictEqual(listHelper.totalLikes([blogs[0]]), 7)
  })
  test('are calculated correctly for multiple blog items in the blog list', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36)
  })
})

describe('favorite blog', () => {
  test('of an empty blog list is null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })
  test('is the same blog from the single blog array', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([blogs[1]]), blogs[1])
  })
  test('is found correctly from a multiple blog items array', () => {
    assert.strictEqual(listHelper.favoriteBlog(blogs), blogs[2])
  })
})

describe('most blogs', () => {
  test('of an empty blog list is null', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })
  test('is the same author from the single blog array', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([blogs[0]]), { author: 'Michael Chan', count: 1 })
  })
  test('is the author with most entries in a mulitple blog items array.', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), { author: 'Robert C. Martin', count: 3 })
  })
})

describe('most blogs (Lodash)', () => {
  test('of an empty blog list is null', () => {
    assert.strictEqual(listHelper.mostBlogsLodash([]), null)
  })
  test('is the same author from the single blog array', () => {
    assert.deepStrictEqual(listHelper.mostBlogsLodash([blogs[0]]), { author: 'Michael Chan', count: 1 })
  })
  test('is the author with most entries in a mulitple blog items array.', () => {
    assert.deepStrictEqual(listHelper.mostBlogsLodash(blogs), { author: 'Robert C. Martin', count: 3 })
  })
})
