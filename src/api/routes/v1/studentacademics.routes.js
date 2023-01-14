const express = require('express');
const { celebrate: validate } = require('celebrate');
const { authorize } = require('../../middlewares/auth');
const controller = require('../../controllers/v1/studentacademics.controller');
const {
  create,
  read,
  update,
  remove,
} = require('../../validations/studentacademics.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {post} api/v1/studentacademics Create Studentacademics
   * @apiDescription Create Studentacademics
   * @apiVersion 1.0.0
   * @apiName Create
   * @apiGroup Studentacademics
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Studentacademics
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  // .post(validate(create), authorize(['admin']), controller.create);
  .post(validate(create), authorize(['admin']), controller.create);

router
  .route('/')
  /**
   * @api {get} api/v1/studentacademics List Studentacademics
   * @apiDescription List Studentacademics
   * @apiVersion 1.0.0
   * @apiName List
   * @apiGroup Studentacademics
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Array} Studentacademics
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(controller.list);

router
  .route('/:id')
  /**
   * @api {get} api/v1/studentacademics/:id Read Studentacademics
   * @apiDescription Read Studentacademics
   * @apiVersion 1.0.0
   * @apiName Read
   * @apiGroup Studentacademics
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Studentacademics
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(validate(read), controller.read);

router
  .route('/:id')
  /**
   * @api {put} api/v1/studentacademics/:id Update Studentacademics
   * @apiDescription Update Studentacademics
   * @apiVersion 1.0.0
   * @apiName Update
   * @apiGroup Studentacademics
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Studentacademics
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .put(validate(update), controller.update);

router
  .route('/:id')
  /**
   * @api {delete} api/v1/studentacademics/:id Delete Studentacademics
   * @apiDescription Delete Studentacademics
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