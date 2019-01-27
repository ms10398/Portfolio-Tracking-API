const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/trade.controller');
const {
  addTrade,
  updateTrade,
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
   *              minimum: 1
   *              required: true
   *              example: 5
   *    produces:
   *      application/json
   *    responses:
   *      200:
   *        description: Returns added trade
   *      400:
   *        description: If you don't have enough stocks or the security in your portfolio
   */
  .post(validate(addTrade), controller.addTrade);

router
  .route('/update/:id')
  /**
   * @swagger
   * /trade/update/{id}:
   *  post:
   *    description: Used to add any trade
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        type: string
   *      - in: body
   *        name: body
   *        required: true
   *        schema:
   *          type: object
   *          properties:
   *            updatedQuantity:
   *              type: number
   *              minimum: 1
   *              required: true
   *              example: 5
   *    produces:
   *      application/json
   *    responses:
   *      200:
   *        description: Returns modified trade object
   *      400:
   *        description: Trade cannot be udpated with the given value or trade is not found in DB
   */
  .post(validate(updateTrade), controller.updateTrade);

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
