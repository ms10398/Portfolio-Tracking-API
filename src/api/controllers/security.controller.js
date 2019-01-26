const httpStatus = require('http-status');
const Security = require('../models/security.model');

module.exports = {
  get: async (req, res, next) => {
    try {
      const security = await Security.find();
      res.status(httpStatus.OK);
      res.json(security);
    } catch (error) {
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      let security = new Security(req.body);
      security = await security.save();
      res.status(httpStatus.CREATED);
      res.json(security);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { ticker } = req.params;
      const security = await Security.findOneAndUpdate({ ticker }, req.body, { new: true });
      res.status(httpStatus.OK);
      res.json(security);
    } catch (error) {
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      const { ticker } = req.params;
      const security = await Security.remove({ ticker });
      res.status(httpStatus.OK);
      res.json(security);
    } catch (error) {
      next(error);
    }
  },
};
