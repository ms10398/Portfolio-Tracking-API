const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/trade.controller');
const {
  addTrade,
  removeTrade,
} = require('../validations/trade.validation');

const router = express.Router();

router
  .route('/add')
  /**
   * @swagger
   * /addTrade:
   *  post:
   *    description: Used to add any trade
   *    responses:
   *      200:
   *        description: Trade added successfully
   */
  .post(validate(addTrade), controller.addTrade);

router
  .route('/remove/:id')
  .delete(validate(removeTrade), controller.updateTrade);

module.exports = router;
