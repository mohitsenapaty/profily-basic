const { Joi, Segments } = require('celebrate');

module.exports = {
  // POST /api/v1/holiday
  create: {
    [Segments.BODY]: {
      schoolid: Joi.string().required(),
      academicprofileid: Joi.string().required(),
      holidayname: Joi.string().required(),
      holidaytype: Joi.string().required(),
      description: Joi.string(),
      datestart: Joi.date().required(),
      dateend: Joi.date().required(),
    },
  },
  // GET /api/v1/holiday/:id
  read: {
    [Segments.PARAMS]: {
      id: Joi.string(),
    },
  },
  // PUT /api/v1/holiday/:id
  update: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      schoolid: Joi.string().required(),
      academicprofileid: Joi.string().required(),
      holidayname: Joi.string().required(),
      holidaytype: Joi.string().required(),
      description: Joi.string(),
      datestart: Joi.date(),
      dateend: Joi.date(),
    },
  },
  // DELETE /api/v1/holiday/:id
  remove: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  },
};