const { logger } = require('../../../config/logger');
const httpStatus = require('http-status');
const moment = require('moment');
const School = require('../../models/school.model');

/**
 * Create School
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const exists = await School.scan({
      schoolphone: req.body.schoolphone, archived: false
    }).exec();
    if (exists.length > 0){
      return res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED, message: 'School created successfully', school: exists[0]
      });
    }
    const school = await School.createSchool({...req.body, addedby: req.user._id});
    logger.info(school);
    return res.status(httpStatus.CREATED).json({
      code: httpStatus.CREATED, message: 'School created successfully', school
    });
  } catch (error) {
    // TODO: make idempotent by handling unique constraint violation error
    return next(error);
  }
};

/**
 * Read School
 * @public
 */
exports.read = async (req, res, next) => {
  try {
    const school = await School.scan({ _id: req.params.id, archived: false }).exec();

    if (school) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'School fetched successfully', school
      });
    }
    return res.status(httpStatus.NOT_FOUND).json({
      code: httpStatus.NOT_FOUND, message: 'Resource not found'
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * List School
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    logger.info(req.query);
    const schools = await School.scan({
      ...(req.query.schoolname) && {
        name: {eq: req.query.schoolname}
      },
      ...(req.query.schoolemail) && {
        name: {eq: req.query.schoolemail}
      },
      ...(req.query.schoolphone) && {
        name: {eq: req.query.schoolphone}
      },
    }).exec();

    return res.status(httpStatus.OK).json({
      code: httpStatus.OK, message: 'School(s) fetched successfully', schools
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update School
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const school = await School.updateSchool({_id: req.params.id,}, ...req.body);

    if (school) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'School updated successfully', school
      });
    }
    return res.status(httpStatus.NOT_FOUND).json({
      code: httpStatus.NOT_FOUND, message: 'Resource not found'
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Delete School
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const school = await School.findOneAndUpdate({
      _id: req.params.id,
      archived: false,
    }, {
      archived: true,
      archivedAt: moment().toISOString(),
    });

    if (school) {
      return res.status(httpStatus.NO_CONTENT);
    }
    return res.status(httpStatus.NOT_FOUND).json({
      code: httpStatus.NOT_FOUND, message: 'Resource not found'
    });
  } catch (error) {
    return next(error);
  }
};