const { Joi, Segments } = require('celebrate');

module.exports = {
  // POST /api/v1/teacheracademics
  create: {
    [Segments.BODY]: {
      schoolid: Joi.string().required(),
      teacherprofileid: Joi.string().required(),
      academicprofileid: Joi.string().required(),
      classteacher: Joi.object({}).unknown(true),
      subjects: Joi.array().items(Joi.object({}).unknown(true)),
    },
  },
  // GET /api/v1/teacheracademics/:id
  read: {
    [Segments.PARAMS]: {
      id: Joi.string(),
    },
  },
  // PUT /api/v1/teacheracademics/:id
  update: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      schoolid: Joi.string().required(),
      teacherprofileid: Joi.string().required(),
      academicprofileid: Joi.string().required(),
      classteacher: Joi.object({}).unknown(true),
      subjects: Joi.array().items(Joi.object({}).unknown(true)),
    },
  },
  // DELETE /api/v1/teacheracademics/:id
  remove: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  },
};