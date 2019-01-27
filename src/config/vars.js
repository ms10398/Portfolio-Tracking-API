require('dotenv-safe').config({
  allowEmptyValues: true,
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: process.env.MONGO_URI,
};
