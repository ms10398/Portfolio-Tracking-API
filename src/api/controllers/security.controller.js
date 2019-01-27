const httpStatus = require('http-status');
const Security = require('../models/security.model');

module.exports = {
  get: async (req, res, next) => {
    try {
      // Fetch all securities and return
      const security = await Security.find();
      res.status(httpStatus.OK);
      res.json(security);
    } catch (error) {
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      // Add mew security to the database from req.body
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
      // Update the security found in req.params
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
      // Remove the security found in req.params
      const { ticker } = req.params;
      const security = await Security.remove({ ticker });
      if (security.n === 1) {
        res.status(httpStatus.OK);
        res.json({ message: 'Security Removed Successfully' });
      }
    } catch (error) {
      next(error);
    }
  },
};
