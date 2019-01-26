const Joi = require('joi');

module.exports = {

  addTrade: {
    body: {
      ticker: Joi.string().required(),
      action: Joi.string().valid(['buy', 'sell']).required(),
      quantity: Joi.number().min(0).required(),
    },
  },
  removeTrade: {
    param: {
      id: Joi.string().required(),
    },
  },
};
