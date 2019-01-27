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
   * /trade/add:
   *  post:
   *    description: Used to add any trade
   *    parameters:
   *      - in: body
   *        name: body
   *        required: true
   *        schema:
   *          type: object
   *          properties:
   *            ticker:
   *              required: true
   *              type: string
   *              example: TCS
   *            action:
   *              required: true
   *              type: string
   *              enum: [buy, sell]
   *            quantity:
   *              type: number
   *              minimum: 0
   *              required: true
   *              example: 5
   *    produces:
   *      application/json
   *    responses:
   *      200:
   *        description: Returns added trade
   */
  .post(validate(addTrade), controller.addTrade);

router
  .route('/remove/:id')
  /**
   * @swagger
   * /trade/remove/{id}:
   *  delete:
   *    description: Used to remove any trade
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        type: string
   *    produces:
   *      application/json
   *    responses:
   *      200:
   *        description: Returns Removed Trade Successfully
   *      400:
   *        description: Returns Request was not completed Successfully
   */
  .delete(validate(removeTrade), controller.removeTrade);

module.exports = router;
