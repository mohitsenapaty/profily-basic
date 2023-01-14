const { Joi, Segments } = require('celebrate');

module.exports = {
  // POST /api/v1/school
  create: {
    [Segments.BODY]: {
      schoolname: Joi.string().alphanum().min(3).max(50)
        .required(),
      schooladdress: Joi.string().allow('').required(),
      schoolemail: Joi.string().required(),
      schoolphone: Joi.string().required(),
      schoolpin: Joi.string().required(),
    },
  },
  // GET /api/v1/school/:id
  read: {
    [Segments.PARAMS]: {
      id: Joi.string(),
    },
  },
  // PUT /api/v1/school/:id
  update: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      schoolname: Joi.string().alphanum().min(3).max(50),
      schooladdress: Joi.string().allow(''),
      schoolemail: Joi.string(),
      schoolphone: Joi.string(),
      schoolpin: Joi.string(),
    },
  },
  // DELETE /api/v1/school/:id
  remove: {
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  },
};