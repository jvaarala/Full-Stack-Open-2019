const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesArray = blogs.map((blogs) => blogs.likes)
  if (likesArray.length === 0) {
    return 0
  } else {
    return likesArray.reduce(function (a, b) {
      return a + b
    })
  }

}

const favoriteBlog = (blogs) => {

  if (blogs.length === 0) {
    return null
  } else {
    const result = Math.max.apply(Math, blogs.map(function (blog) {
      return blog.likes
    }))

    const object = blogs.find(function (blog) {
      return blog.likes === result
    })

    return {
      title: object.title,
      author: object.author,
      likes: object.likes
    }
  }
}

const mostBlogs = (blogsArr) => {
  if (blogsArr.length === 0) {
    return null
  } else {
    const countByArr = _.countBy(blogsArr, function (blog) {
      return blog.author
    })
    const remap = Object.keys(countByArr).map(el => ({ author: el, blogs: countByArr[el] }))
    const resultObject = _.maxBy(remap, function (o) {
      return o.blogs
    })
    return resultObject
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}