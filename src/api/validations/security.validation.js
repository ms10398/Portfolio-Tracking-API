const Joi = require('joi');

module.exports = {
  addSecurity: {
    body: {
      ticker: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number(),
    },
  },
  updateSecurity: {
    param: {
      ticker: Joi.string().required(),
    },
    body: {
      ticker: Joi.string(),
      name: Joi.string(),
      price: Joi.number(),
    },
  },
  removeSecurity: {
    param: {
      ticker: Joi.string().required(),
    },
  },
};
