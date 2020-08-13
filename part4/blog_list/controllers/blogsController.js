const route = require('express').Router();
const Blog = require('../models/blog');

route.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs);
});

route.post('/blogs', (request, response) => {
  if (!request.body.title) {
    return response.status(400).end()
  }
  const blog = new Blog(request.body);
  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = route;
