const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const routes = require('../api/routes');
const logger = require('./logger');

// Express Instance
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());
// Gzip Compression for response body
app.use(compression());
// mount api routes
app.use('/api', routes);

app.use('/', (req, res, next) => {
  res.json({ message: 'Sorry, Nothing here! Go to /api/docs to see how to use the API.' });
});
// Error handler
app.use((err, req, res, next) => {
  logger.error(err.message);
  logger.error(err.stack);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
