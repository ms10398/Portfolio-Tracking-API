const express = require('express');
const controller = require('../controllers/security.controller');

const router = express.Router();

router
  .route('/getPortfolio')
  /**
   * @swagger
   * /security/get:
   *  get:
   *    description: Fetches details of all securities
   *    responses:
   *      200:
   *        description: Returns all securities
   */
  .get(controller.getPortfolio);

module.exports = router;
