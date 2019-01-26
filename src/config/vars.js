const path = require('path');

require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: process.env.MONGO_URI,
};
