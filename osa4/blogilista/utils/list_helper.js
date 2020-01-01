const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const likesArray = blogs.map((blogs) => blogs.likes)
  if (likesArray.length === 0) {
    return 0
  } else {
    const likesSum = likesArray.reduce(function (a, b) {return a+b})
    console.log(likesSum)
    return likesSum
  }

}

module.exports = {
  dummy,
  totalLikes
}