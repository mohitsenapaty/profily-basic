const { Joi, Segments } = require('celebrate');

module.exports = {
  // POST /api/v1/studentprofile
  create: {
    [Segments.BODY]: {
      schoolid: Joi.string().required(),
      userid: Joi.string().allow(''),
      admissionid: Joi.string().allow('').required(),
      studentname: Joi.string().required(),
      studentphone: Joi.string().required(),
      studentemail: Joi.string().required(),
      dob: Joi.string().required(),
      guardianname: Joi.string().required(),
      joindate: Joi.string().required(),
      reference: Joi.string().allow(''),
    },
  },
  // GET /api/v1/studentprofile/:id
  read: {
    [Segments.PARAMS]: {
      id: Joi.string(),
    },
  },
  // PUT /api/v1/studentprofile/:id
  update: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      schoolid: Joi.string(),
      userid: Joi.string(),
      admissionid: Joi.string(),
      studentname: Joi.string(),
      studentphone: Joi.string(),
      studentemail: Joi.string(),
      dob: Joi.string(),
      guardianname: Joi.string(),
      joindate: Joi.string(),
      reference: Joi.string(),
    },
  },
  // DELETE /api/v1/studentprofile/:id
  remove: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  },
};