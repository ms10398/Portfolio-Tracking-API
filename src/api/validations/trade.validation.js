const Joi = require('joi');

module.exports = {
  addTrade: {
    body: {
      ticker: Joi.string().required(),
      action: Joi.string().valid(['buy', 'sell']).required(),
      quantity: Joi.number().min(1).required(),
    },
  },
  updateTrade: {
    param: {
      id: Joi.string().required(),
    },
    body: {
      updatedQuantity: Joi.number().min(1).required(),
    },
  },
  removeTrade: {
    param: {
      id: Joi.string().required(),
    },
  },
};
