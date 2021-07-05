const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')


test('test invalid user creation, when username is shorter than 3', async () =>{
  const user = {
    username: "fr",
    name: "fresh",
    password: "dasds",
  }

  await api
    .post('/api/users')
    .send(user)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

test('test invalid user creation, when password is shorter than 3', async () =>{
    const user = {
      username: "fresh",
      name: "fresh",
      password: "da",
    }
  
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')
    console.log('username', result.body)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })



afterAll(() => {
  mongoose.connection.close()
})

test('test invalid user creation, when password is missing', async () =>{
    const user = {
      username: "fresh",
      name: "fresh"
    }
  
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
  })



afterAll(() => {
  mongoose.connection.close()
})