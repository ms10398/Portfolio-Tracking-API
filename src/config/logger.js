const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};
// Winston logger initialised and exported
module.exports = logger;
