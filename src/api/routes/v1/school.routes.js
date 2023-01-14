const express = require('express');
const { celebrate: validate } = require('celebrate');
const { authorize } = require('../../middlewares/auth');
const controller = require('../../controllers/v1/school.controller');
const {
  create,
  read,
  update,
  remove,
} = require('../../validations/school.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {post} api/v1/school Create School
   * @apiDescription Create School
   * @apiVersion 1.0.0
   * @apiName Create
   * @apiGroup School
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} School
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  // .post(validate(create), authorize(['admin']), controller.create);
  .post(validate(create), authorize(['admin']), controller.create);

router
  .route('/')
  /**
   * @api {get} api/v1/school List School
   * @apiDescription List School
   * @apiVersion 1.0.0
   * @apiName List
   * @apiGroup School
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Array} School
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(controller.list);

router
  .route('/:id')
  /**
   * @api {get} api/v1/school/:id Read School
   * @apiDescription Read School
   * @apiVersion 1.0.0
   * @apiName Read
   * @apiGroup School
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} School
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .get(validate(read), controller.read);

router
  .route('/:id')
  /**
   * @api {put} api/v1/school/:id Update School
   * @apiDescription Update School
   * @apiVersion 1.0.0
   * @apiName Update
   * @apiGroup School
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {Object} School
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admin can access the data
   */
  .put(validate(update), controller.update);

router
  .route('/:id')
  /**
   * @api {delete} api/v1/school/:id Delete School
   * @apiDescription Delete School
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