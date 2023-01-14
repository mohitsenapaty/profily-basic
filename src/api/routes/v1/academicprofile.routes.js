const express = require('express');
const { celebrate: validate } = require('celebrate');
const { authorize } = require('../../middlewares/auth');
const controller = require('../../controllers/v1/academicprofile.controller');
const {
  create,
  read,
  update,
  remove,
} = require('../../validations/academicprofile.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {post} api/v1/academicprofile Create Academicprofile
   * @apiDescription Create Academicprofile
   * @apiVersion 1.0.0
   * @apiName Create
   * @apiGroup Academicprofile
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Academicprofile
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  // .post(validate(create), authorize(['admin']), controller.create);
  .post(validate(create), authorize(['admin']), controller.create);

router
  .route('/')
  /**
   * @api {get} api/v1/academicprofile List Academicprofile
   * @apiDescription List Academicprofile
   * @apiVersion 1.0.0
   * @apiName List
   * @apiGroup Academicprofile
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Array} Academicprofile
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(controller.list);

router
  .route('/:id')
  /**
   * @api {get} api/v1/academicprofile/:id Read Academicprofile
   * @apiDescription Read Academicprofile
   * @apiVersion 1.0.0
   * @apiName Read
   * @apiGroup Academicprofile
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Academicprofile
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(validate(read), controller.read);

router
  .route('/:id')
  /**
   * @api {put} api/v1/academicprofile/:id Update Academicprofile
   * @apiDescription Update Academicprofile
   * @apiVersion 1.0.0
   * @apiName Update
   * @apiGroup Academicprofile
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} Academicprofile
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .put(validate(update), controller.update);

router
  .route('/:id')
  /**
   * @api {delete} api/v1/academicprofile/:id Delete Academicprofile
   * @apiDescription Delete Academicprofile
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