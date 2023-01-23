const express = require('express');
const { celebrate: validate } = require('celebrate');
const { authorize } = require('../../middlewares/auth');
const controller = require('../../controllers/v1/holiday.controller');
const {
  create,
  read,
  update,
  remove,
} = require('../../validations/holiday.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {post} api/v1/holiday Create Holiday
   * @apiDescription Create Holiday
   * @apiVersion 1.0.0
   * @apiName Create
   * @apiGroup Holiday
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Holiday
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  // .post(validate(create), authorize(['admin']), controller.create);
  .post(validate(create), authorize(['admin']), controller.create);

router
  .route('/')
  /**
   * @api {get} api/v1/holiday List Holiday
   * @apiDescription List Holiday
   * @apiVersion 1.0.0
   * @apiName List
   * @apiGroup Holiday
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Array} Holiday
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(controller.list);

router
  .route('/:id')
  /**
   * @api {get} api/v1/holiday/:id Read Holiday
   * @apiDescription Read Holiday
   * @apiVersion 1.0.0
   * @apiName Read
   * @apiGroup Holiday
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Holiday
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(validate(read), controller.read);

router
  .route('/:id')
  /**
   * @api {put} api/v1/holiday/:id Update Holiday
   * @apiDescription Update Holiday
   * @apiVersion 1.0.0
   * @apiName Update
   * @apiGroup Holiday
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Holiday
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .put(validate(update), controller.update);

router
  .route('/:id')
  /**
   * @api {delete} api/v1/holiday/:id Delete Holiday
   * @apiDescription Delete Holiday
   * @apiVersion 1.0.0
   * @apiName Delete
   * @apiGroup Role
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} sucess/failure
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .delete(validate(remove), controller.delete);

module.exports = router;