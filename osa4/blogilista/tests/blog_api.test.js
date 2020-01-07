const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testData = require('./test_data')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(testData.dummyBlogs[0])
  await blogObject.save()

  blogObject = new Blog(testData.dummyBlogs[1])
  await blogObject.save()
})


describe('basic functionality of api', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are 2 blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(2)
  })

  test('the first blog is about "React patterns"', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe('React patterns')
  })

  test('blogs are identified by "id"', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id.toBeDefined)
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newTestBlog = new Blog({
      title: 'lorem',
      author: 'ipsum',
      url: 'https://te.st/',
      likes: 13,
    })

    await api
      .post('/api/blogs')
      .send(newTestBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await api.get('/api/blogs').expect(200)
    expect(blogsAtEnd.body.length).toBe(3)

    const contents = blogsAtEnd.body.map(n => n.title)
    expect(contents).toContain(
      'lorem'
    )
  })
})

afterAll(() => {
  mongoose.connection.close()
})