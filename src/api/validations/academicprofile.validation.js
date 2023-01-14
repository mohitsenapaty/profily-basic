const { Joi, Segments } = require('celebrate');

module.exports = {
  // POST /api/v1/academicprofile
  create: {
    [Segments.BODY]: {
      schoolid: Joi.string().required(),
      session: Joi.string().allow('').required(),
      description: Joi.string().allow('').required(),
      startdate: Joi.string().required(),
      enddate: Joi.string().required(),
      structure: Joi.array().items(Joi.object({}).unknown(true)),
      subjects: Joi.array().items(Joi.object({}).unknown(true)),
    },
  },
  // GET /api/v1/academicprofile/:id
  read: {
    [Segments.PARAMS]: {
      id: Joi.string(),
    },
  },
  // PUT /api/v1/academicprofile/:id
  update: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      schoolid: Joi.string(),
      session: Joi.string().allow(''),
      description: Joi.string().allow(''),
      startdate: Joi.string(),
      enddate: Joi.string(),
      structure: Joi.array().items(Joi.object({}).unknown(true)),
      subjects: Joi.array().items(Joi.object({}).unknown(true)),
    },
  },
  // DELETE /api/v1/academicprofile/:id
  remove: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  },
};