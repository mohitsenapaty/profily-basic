const { Joi, Segments } = require('celebrate');

module.exports = {
  // POST /api/v1/timetable
  create: {
    [Segments.BODY]: {
      schoolid: Joi.string().required(),
      academicprofileid: Joi.string().required(),
      validfrom: Joi.string().required(),
      validto: Joi.string().required(),
      schedule: Joi.object({}).unknown(true),
    },
  },
  // GET /api/v1/timetable/:id
  read: {
    [Segments.PARAMS]: {
      id: Joi.string(),
    },
  },
  // PUT /api/v1/timetable/:id
  update: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      schoolid: Joi.string().required(),
      academicprofileid: Joi.string().required(),
      validfrom: Joi.string().required(),
      validto: Joi.string().required(),
      schedule: Joi.object({}).unknown(true),
    },
  },
  // DELETE /api/v1/timetable/:id
  remove: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  },
};