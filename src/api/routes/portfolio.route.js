const express = require('express');
const controller = require('../controllers/portfolio.controller');

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

router
  .route('/getHoldings')
  .get(controller.getHoldings);

router
  .route('/getReturns')
  .get(controller.getReturns);

module.exports = router;
