const route = require('express').Router();
const Blog = require('../models/blog');

route.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

route.post('/blogs', async (request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

route.get('/blogs/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

route.delete('/blogs/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

route.put('/blogs/:id', async (request, response) => {
  const { body } = request;
  const updatedBlog = await Blog.findByIdAndUpdate(body.id, body,  { new: true,  runValidators: true});
  response.json(updatedBlog);
});

module.exports = route;
