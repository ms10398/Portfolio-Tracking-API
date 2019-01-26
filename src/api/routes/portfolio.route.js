const express = require('express');
const controller = require('../controllers/portfolio.controller');

const router = express.Router();

router
  .route('/getPortfolio')
  /**
   * @swagger
   * /portfolio/getPortfolio:
   *  get:
   *    description: Fetches all trades for the securities in Portfolio
   *    produces:
   *      application/json
   *    responses:
   *      200:
   *        description: Returns all trade details
   */
  .get(controller.getPortfolio);

router
  .route('/getHoldings')
  /**
   * @swagger
   * /portfolio/getHoldings:
   *  get:
   *    description: Fetches all securities with their quantity and avgBuyPrice
   *    produces:
   *      application/json
   *    responses:
   *      200:
   *        description: Returns all securities with their quantity and avgBuyPrice
   */
  .get(controller.getHoldings);

router
  .route('/getReturns')
  /**
   * @swagger
   * /portfolio/getReturns:
   *  get:
   *    description: Calculates returns of the current holding
   *    produces:
   *      application/json
   *    responses:
   *      200:
   *        description: Returns the return of the current holdings
   */
  .get(controller.getReturns);

module.exports = router;
