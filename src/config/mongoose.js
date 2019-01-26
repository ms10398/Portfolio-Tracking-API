const mongoose = require('mongoose');
const logger = require('./../config/logger');
const { mongo } = require('./vars');

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

mongoose.connection.on('connected', () => logger.info('MongoDB Connected'));

mongoose.set('debug', true);

exports.connect = () => {
  mongoose.connect(mongo, {
    keepAlive: 1,
    useNewUrlParser: true,
  });
  return mongoose.connection;
};
