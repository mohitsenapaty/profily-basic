const { Joi, Segments } = require('celebrate');

module.exports = {
  // POST /api/v1/teacherprofile
  create: {
    [Segments.BODY]: {
      schoolid: Joi.string().required(),
      userid: Joi.string().allow(''),
      employmentid: Joi.string().allow('').required(),
      teachername: Joi.string().required(),
      teacheremail: Joi.string().required(),
      teacherphone: Joi.string().required(),
      nickname: Joi.string().allow('').required(),
      joindate: Joi.string().required(),
      reference: Joi.string().allow(''),
    },
  },
  // GET /api/v1/teacherprofile/:id
  read: {
    [Segments.PARAMS]: {
      id: Joi.string(),
    },
  },
  // PUT /api/v1/teacherprofile/:id
  update: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      schoolid: Joi.string(),
      userid: Joi.string(),
      employmentid: Joi.string(),
      teachername: Joi.string(),
      teacheremail: Joi.string(),
      teacherphone: Joi.string(),
      nickname: Joi.string(),
      joindate: Joi.string(),
      reference: Joi.string(),
    },
  },
  // DELETE /api/v1/teacherprofile/:id
  remove: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  },
};