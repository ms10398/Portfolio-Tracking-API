const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/security.controller');
const {
  addSecurity,
  updateSecurity,
  removeSecurity,
} = require('../validations/security.validation');

const router = express.Router();

router
  .route('/get')
  .get(controller.get);

router
  .route('/add')
  /**
   * @swagger
   * /api/security/add:
   *  post:
   *    description: Used to add new security
   *    responses:
   *      201:
   *        description: Security added successfully
   */
  .post(validate(addSecurity), controller.add);

router
  .route('/update/:ticker')
  .post(validate(updateSecurity), controller.update);

router
  .route('/remove/:ticker')
  .delete(validate(removeSecurity), controller.remove);


module.exports = router;
