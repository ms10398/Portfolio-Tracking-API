const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/trade.controller');
const {
  addTrade,
} = require('../validations/trade.validation');

const router = express.Router();

router
  .route('/addTrade')
  /**
   * @swagger
   * /addTrade:
   *  get:
   *    description: Used to add any trade
   *    responses:
   *      200:
   *        description: Trade added successfully
   */
  .get(validate(addTrade), controller.get);

module.exports = router;
