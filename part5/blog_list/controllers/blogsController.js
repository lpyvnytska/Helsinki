const route = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

route.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

route.post('/', async (request, response) => {
  const { body } = request;
  const { userId, ...newBlog } = body;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({ ...newBlog, user: decodedToken.id });
  const savedBlog = await blog.save();
  const responseBlog = await Blog.findById(savedBlog.id).populate('user', {
    username: 1,
    name: 1,
  });
  if (!user.blogs) {
    user.blogs = [];
  }
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(responseBlog);
});

route.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

route.delete('/:id', async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(401).json({ error: 'user is invalid' });
  }
  const blog = await Blog.findById(request.params.id);
  console.log(user.id.toString(), blog.user.toString());
  if (user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: 'Forbidden' });
  }
  await blog.remove();
  // await Blog.findByIdAndRemove(request.params.id);
  user.blogs = user.blogs.filter((blog) => blog.id !== request.params.id);
  await user.save();
  response.status(204).end();
});

route.put('/:id', async (request, response) => {
  const { body } = request;
  console.log(body);
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
    runValidators: true,
  });
  response.json(updatedBlog);
});

module.exports = route;
