const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "fresh",
    author: "asdasdasd",
    url: "asd",
    likes: 2
  },
  {
    title: "test",
    author: "test",
    url: "test",
    likes: 10
  },
]


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {initialBlogs, usersInDb}