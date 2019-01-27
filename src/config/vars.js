require('dotenv-safe').config({
  // Allow empty values for heroku deployment
  allowEmptyValues: true,
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: process.env.MONGO_URI,
};
