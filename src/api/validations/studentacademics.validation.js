const { Joi, Segments } = require('celebrate');

module.exports = {
  // POST /api/v1/studentacademics
  create: {
    [Segments.BODY]: {
      schoolid: Joi.string().required(),
      studentprofileid: Joi.string().required(),
      academicprofileid: Joi.string().required(),
      details: Joi.object({}).unknown(true),
    },
  },
  // GET /api/v1/studentacademics/:id
  read: {
    [Segments.PARAMS]: {
      id: Joi.string(),
    },
  },
  // PUT /api/v1/studentacademics/:id
  update: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      schoolid: Joi.string().required(),
      studentprofileid: Joi.string().required(),
      academicprofileid: Joi.string().required(),
      details: Joi.object({}).unknown(true),
    },
  },
  // DELETE /api/v1/studentacademics/:id
  remove: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  },
};