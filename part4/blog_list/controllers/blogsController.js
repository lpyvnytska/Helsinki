const route = require('express').Router();
const Blog = require('../models/blog');

route.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

route.post('/', async (request, response) => {
  const { body } = request;
  const { userId, ...newBlog } = body;
  const user = await User.findById(userId);
  const blog = new Blog({ ...newBlog, user: user._id });
  const savedBlog = await blog.save();
  user.notes = user.notes.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog);
});

route.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

route.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

route.put('/:id', async (request, response) => {
  const { body } = request;
  const updatedBlog = await Blog.findByIdAndUpdate(body.id, body, {
    new: true,
    runValidators: true,
  });
  response.json(updatedBlog);
});

module.exports = route;
