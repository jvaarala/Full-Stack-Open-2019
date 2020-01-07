const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


// TODO async/await!!


blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (e) {
    next(e)
  }
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (e) {
    next(e)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (e) {
    next(e)
  }
})

module.exports = blogsRouter