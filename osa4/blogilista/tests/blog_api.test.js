const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Blog = require('../models/blog')

//token for postin blogs
let token = null;

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

beforeAll(async () => {
  await User.deleteMany({})
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash('admin', saltRounds)
  const user = new User({ username: 'admin', passwordHash })

  await user.save()
  await api
    .post('/api/login')
    .send({ username: 'admin', password: 'admin' })
    .then((result) => {
      return (token = result.body.token)
    })

  return token
})

test('there are two notes', async () => {
  console.log('testi123', token)
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})

test('checks if there is id instead of _id', async () =>{
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  });
})

test('notes amount increase when POST', async () =>{
  const blog = {
    title: "axaxaaxxaxaxaax",
    author: "asdsadasdasdasdasd",
    url: "asdasdsadsadasdasd",
    likes: 420
  }

  await api
    .post('/api/blogs')
    .set({ 'Authorization': 'bearer ' + token })
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain(
      'axaxaaxxaxaxaax'
    )
})

test('likes default value is zero', async () =>{
  const blog = {
    title: "axaxaaxxaxaxaax",
    author: "asdsadasdasdasdasd",
    url: "asdasdsadsadasdasd"
  }

  await api
    .post('/api/blogs')
    .set({ 'Authorization': 'bearer ' + token })
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      if(blog.title === 'axaxaaxxaxaxaax'){
        expect(blog.likes).toBe(0)
      }
    })

})

test('response 400, if no title or url', async () =>{
  const blog = {
    author: "asdsadasdasdasdasd",
    likes: 1123
  }

  await api
    .post('/api/blogs')
    .set({ 'Authorization': 'bearer ' + token })
    .send(blog)
    .expect(400)
    
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('if token is missing return 401 statuscode', async () => {

  const blog = {
    title: 'sdajhdsialhdasod',
    author: 'Absadasdasdobr',
    likes: 1342234
  }

  await api.post('/api/blogs', blog)
    .send(blog)
    .expect(401)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})