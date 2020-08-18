const route = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

route.post('/', async (request, response) => {
  const body = request.body;
  if (body.password.length < 3) {
    return response.status(400).send({
      error:
        'User validation failed: password: Path `password` is shorter than the minimum allowed length (3).',
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });
  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

route.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { user: 0 });
  response.json(users);
});

module.exports = route;
