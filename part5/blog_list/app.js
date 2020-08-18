const express = require('express');
require('express-async-errors')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const config = require('./utils/config');
const logger = require('./utils/logger');
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
} = require('./utils/middleware');
const blogsController = require('./controllers/blogsController');
const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');

let mongoUrl = config.MONGO_URL;
if (process.env.NODE_ENV == 'test') {
  mongoUrl = config.TEST_MONGODB_URI
}

logger.info('connecting to MongoDB');
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, 'useCreateIndex': true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(tokenExtractor)

app.use('/api/blogs', blogsController);
app.use('/api/users', usersController);
app.use('/api/login', loginController);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
