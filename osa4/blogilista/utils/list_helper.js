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
    return _.maxBy(remap, function (o) {
      return o.blogs
    })
  }
}


const mostLikes = (blogsArr) => {
  if (blogsArr.length === 0) {
    return null
  } else {
    const resultArr = []
    _.forIn(blogsArr, (blog) => {
      if (!resultArr.map(el => (el.author)).includes(blog.author)) {
        resultArr.push({ author: blog.author, likes: blog.likes })
      } else {
        const index = _.findIndex(resultArr, function (o) {
          return o.author === blog.author
        })
        const sumLikes = resultArr[index].likes + blog.likes
        const replace = { author: blog.author, likes: sumLikes }
        resultArr.splice(index, 1, replace)
      }
    })
    return _.maxBy(resultArr, function (o) {
      return o.likes
    })
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}