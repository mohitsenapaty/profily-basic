const express = require('express');
const { celebrate: validate } = require('celebrate');
const { authorize } = require('../../middlewares/auth');
const controller = require('../../controllers/v1/teacheracademics.controller');
const {
  create,
  read,
  update,
  remove,
} = require('../../validations/teacheracademics.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {post} api/v1/teacheracademics Create Teacheracademics
   * @apiDescription Create Teacheracademics
   * @apiVersion 1.0.0
   * @apiName Create
   * @apiGroup Teacheracademics
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Teacheracademics
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  // .post(validate(create), authorize(['admin']), controller.create);
  .post(validate(create), authorize(['admin']), controller.create);

router
  .route('/')
  /**
   * @api {get} api/v1/teacheracademics List Teacheracademics
   * @apiDescription List Teacheracademics
   * @apiVersion 1.0.0
   * @apiName List
   * @apiGroup Teacheracademics
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Array} Teacheracademics
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(controller.list);

router
  .route('/:id')
  /**
   * @api {get} api/v1/teacheracademics/:id Read Teacheracademics
   * @apiDescription Read Teacheracademics
   * @apiVersion 1.0.0
   * @apiName Read
   * @apiGroup Teacheracademics
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Teacheracademics
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(validate(read), controller.read);

router
  .route('/:id')
  /**
   * @api {put} api/v1/teacheracademics/:id Update Teacheracademics
   * @apiDescription Update Teacheracademics
   * @apiVersion 1.0.0
   * @apiName Update
   * @apiGroup Teacheracademics
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Teacheracademics
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .put(validate(update), controller.update);

router
  .route('/:id')
  /**
   * @api {delete} api/v1/teacheracademics/:id Delete Teacheracademics
   * @apiDescription Delete Teacheracademics
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