const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/trade.controller');
const {
  addTrade,
} = require('../validations/trade.validation');

const router = express.Router();

router
  .route('/')
  .get(validate(addTrade), controller.get);

module.exports = router;
