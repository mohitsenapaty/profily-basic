const express = require('express');
const { celebrate: validate } = require('celebrate');
const { authorize } = require('../../middlewares/auth');
const controller = require('../../controllers/v1/studentprofile.controller');
const {
  create,
  read,
  update,
  remove,
} = require('../../validations/studentprofile.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {post} api/v1/studentprofile Create Studentprofile
   * @apiDescription Create Studentprofile
   * @apiVersion 1.0.0
   * @apiName Create
   * @apiGroup Studentprofile
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Studentprofile
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  // .post(validate(create), authorize(['admin']), controller.create);
  .post(validate(create), authorize(['admin']), controller.create);

router
  .route('/')
  /**
   * @api {get} api/v1/studentprofile List Studentprofile
   * @apiDescription List Studentprofile
   * @apiVersion 1.0.0
   * @apiName List
   * @apiGroup Studentprofile
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Array} Studentprofile
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(controller.list);

router
  .route('/:id')
  /**
   * @api {get} api/v1/studentprofile/:id Read Studentprofile
   * @apiDescription Read Studentprofile
   * @apiVersion 1.0.0
   * @apiName Read
   * @apiGroup Studentprofile
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Studentprofile
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(validate(read), controller.read);

router
  .route('/:id')
  /**
   * @api {put} api/v1/studentprofile/:id Update Studentprofile
   * @apiDescription Update Studentprofile
   * @apiVersion 1.0.0
   * @apiName Update
   * @apiGroup Studentprofile
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Studentprofile
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .put(validate(update), controller.update);

router
  .route('/:id')
  /**
   * @api {delete} api/v1/studentprofile/:id Delete Studentprofile
   * @apiDescription Delete Studentprofile
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