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
  /**
   * @swagger
   * /security/get:
   *  get:
   *    description: Fetches details of all securities
   *    responses:
   *      200:
   *        description: Returns all securities
   */
  .get(controller.get);

router
  .route('/add')
  /**
   * @swagger
   * /security/add:
   *  post:
   *    description: Used to add new security
   *    responses:
   *      201:
   *        description: Returns added security
   */
  .post(validate(addSecurity), controller.add);

router
  .route('/update/:ticker')
  /**
   * @swagger
   * /security/update/:ticker:
   *  post:
   *    description: Used to update existing security
   *    responses:
   *      200:
   *        description: Returns updated security
   */
  .post(validate(updateSecurity), controller.update);

router
  .route('/remove/:ticker')
  /**
   * @swagger
   * /security/remove/:ticker:
   *  delete:
   *    description: Used to update existing security
   *    responses:
   *      200:
   *        description: Security Removed Successfully
   */
  .delete(validate(removeSecurity), controller.remove);


module.exports = router;
