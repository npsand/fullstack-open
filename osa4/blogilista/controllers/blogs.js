const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  try{
    //const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = request.user

    if (!request.token || !user.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const body = request.body



    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })

    const result = await blog.save();


    user.blogs = user.blogs.concat(result.id)
    await user.save()


      response.status(201).json(result)
  }catch(error){
    next(error)
  }
})

blogsRouter.delete('/:id', async(request, response) =>{
  const id = request.params.id;
  
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
  user = request.user;

  if (!request.token || !user.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  
  blog = await Blog.findById(id);

  if ( blog.user.toString() === user.id.toString() ){
    blogs = await Blog.findByIdAndRemove(id);
    response.status(204).end();
  }else{
    response.status(401).json({error: 'No permission to delete blog'});
  }


})

blogsRouter.put('/:id', async(request, response, next) =>{
  const id = request.params.id;
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog)
    response.json(updatedBlog)
  }catch(error){
    next(error)
  }

})


module.exports = blogsRouter