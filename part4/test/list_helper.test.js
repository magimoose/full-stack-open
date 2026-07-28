const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})
describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has one blog favorite should be the only one', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.strictEqual(result, listWithOneBlog[0])
  })
})

describe('favorite blog again', () => {
  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
		{
      _id: '5a422a71b54a676234d17f8',
      title: 'Go  Statement Considered Harmful',
      author: 'Eder W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 7,
      __v: 0
    }
  ]

  test('when list has two blog favorite should be best one', () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs)
    assert.strictEqual(result, listWithTwoBlogs[1])
  })
})
describe('favorite blog again', () => {
  const listWithTwoBlogs = [
    {
      _id: '5a4221b54a676234d17f8',
      title: 'Go TStatement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'httpshomepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
		{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
		{
      _id: '5a422a71b54a676234d17f8',
      title: 'Go  Statement Considered Harmful',
      author: 'Eder W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 7,
      __v: 0
    }
  ]

  test('when list has two blog favorite should be best one', () => {
    const result = listHelper.mostBlogs(listWithTwoBlogs)
    assert.deepStrictEqual(result, {author: 'Edsger W. Dijkstra', blogs: 2})
  })
})

describe('most likes author', () => {
  const listWithTwoBlogs = [
    {
      _id: '5a4221b54a676234d17f8',
      title: 'Go TStatement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'httpshomepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
		{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
		{
      _id: '5a422a71b54a676234d17f8',
      title: 'Go  Statement Considered Harmful',
      author: 'Eder W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 7,
      __v: 0
    }
  ]

  test('when list has two blog favorite should be best one', () => {
    const result = listHelper.mostLikes(listWithTwoBlogs)
    assert.deepStrictEqual(result, {author: 'Edsger W. Dijkstra', likes: 10})
  })
})
