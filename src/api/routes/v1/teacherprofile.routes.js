const express = require('express');
const { celebrate: validate } = require('celebrate');
const { authorize } = require('../../middlewares/auth');
const controller = require('../../controllers/v1/teacherprofile.controller');
const {
  create,
  read,
  update,
  remove,
} = require('../../validations/teacherprofile.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {post} api/v1/teacherprofile Create Teacherprofile
   * @apiDescription Create Teacherprofile
   * @apiVersion 1.0.0
   * @apiName Create
   * @apiGroup Teacherprofile
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Teacherprofile
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  // .post(validate(create), authorize(['admin']), controller.create);
  .post(validate(create), authorize(['admin']), controller.create);

router
  .route('/')
  /**
   * @api {get} api/v1/teacherprofile List Teacherprofile
   * @apiDescription List Teacherprofile
   * @apiVersion 1.0.0
   * @apiName List
   * @apiGroup Teacherprofile
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Array} Teacherprofile
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(controller.list);

router
  .route('/:id')
  /**
   * @api {get} api/v1/teacherprofile/:id Read Teacherprofile
   * @apiDescription Read Teacherprofile
   * @apiVersion 1.0.0
   * @apiName Read
   * @apiGroup Teacherprofile
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Teacherprofile
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(validate(read), controller.read);

router
  .route('/:id')
  /**
   * @api {put} api/v1/teacherprofile/:id Update Teacherprofile
   * @apiDescription Update Teacherprofile
   * @apiVersion 1.0.0
   * @apiName Update
   * @apiGroup Teacherprofile
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Teacherprofile
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .put(validate(update), controller.update);

router
  .route('/:id')
  /**
   * @api {delete} api/v1/teacherprofile/:id Delete Teacherprofile
   * @apiDescription Delete Teacherprofile
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