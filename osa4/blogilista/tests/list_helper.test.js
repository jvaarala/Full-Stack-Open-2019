const listHelper = require('../utils/list_helper')
const testData = require('./test_data')

describe('dummy returns 1', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy(testData.dummyBlogsEmpty)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(testData.dummyBlogsEmpty)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(testData.dummyListWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(testData.dummyBlogs)
    expect(result).toBe(testData.dummyBlogsTotalLikes)
  })
})

describe('favorite blog', () => {
  test('is detected right', () => {
    const result = listHelper.favoriteBlog(testData.dummyBlogs)
    expect(result).toEqual(
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      }
    )
  })
  test('of empty list returns null', () => {
    const result = listHelper.favoriteBlog(testData.dummyBlogsEmpty)
    expect(result).toBe(null)
  })
})

describe('most blogs', () => {
  test('is detected right', () => {
    const result = listHelper.mostBlogs(testData.dummyBlogs)
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        blogs: 4
      }
    )
  })
  test('of empty list returns null', () => {
    const result = listHelper.mostBlogs(testData.dummyBlogsEmpty)
    expect(result).toBe(null)
  })
})

describe('most likes', () => {
  test('is detected right', () => {
    const result = listHelper.mostLikes(testData.dummyBlogs)
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: testData.dummyMostLikes
      }
    )
  })
  test('of empty list returns null', () => {
    const result = listHelper.mostLikes(testData.dummyBlogsEmpty)
    expect(result).toBe(null)
  })
})