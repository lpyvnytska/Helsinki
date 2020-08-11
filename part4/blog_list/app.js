const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const config = require('./utils/config');
const logger = require('./utils/logger');
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require('./utils/middleware');
const blogController = require('./controllers/blogsController');

const mongoUrl = config.MONGO_URL;
logger.info('connecting to MongoDB');
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api', blogController);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
