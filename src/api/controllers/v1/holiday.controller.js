const { logger } = require('../../../config/logger');
const httpStatus = require('http-status');
const moment = require('moment');
const Holiday = require('../../models/holiday.model');

/**
 * Create Holiday
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const exists = await Holiday.scan({
      schoolid: req.body.schoolid,
      academicprofileid: req.body.academicprofileid,
      archived: false,
    }).exec();
    if (exists.length > 0){
      return res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED, message: 'Holiday created successfully',
        holiday: exists[0],
      });
    }
    const holiday = await Holiday.createHoliday({
      ...req.body, addedby: req.user._id,
    });
    logger.info(holiday);
    return res.status(httpStatus.CREATED).json({
      code: httpStatus.CREATED,
      message: 'Holiday created successfully',
      holiday,
    });
  } catch (error) {
    // TODO: make idempotent by handling unique constraint violation error
    return next(error);
  }
};

/**
 * Read Holiday
 * @public
 */
exports.read = async (req, res, next) => {
  try {
    const holiday = await Holiday.scan({
      _id: req.params.id, archived: false,
    }).exec();

    if (holiday) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'Holiday fetched successfully',
        holiday,
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
 * List Holiday
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    logger.info(req.query);
    const holidayList = await Holiday.scan({
      ...(req.query.schoolid) && {
        schoolid: {eq: req.query.schoolid}
      },
      ...(req.query.academicprofileid) && {
        academicprofileid: {eq: req.query.academicprofileid}
      },
    }).exec();

    return res.status(httpStatus.OK).json({
      code: httpStatus.OK, message: 'Holiday(s) fetched successfully',
      holidayList,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update Holiday
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const holiday = await Holiday.updateHoliday(
      {_id: req.params.id,}, ...req.body
    );

    if (holiday) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'Holiday updated successfully',
        holiday,
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
 * Delete Holiday
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const holiday = await Holiday.findOneAndUpdate({
      _id: req.params.id,
      archived: false,
    }, {
      archived: true,
      archivedAt: moment().toISOString(),
    });

    if (holiday) {
      return res.status(httpStatus.NO_CONTENT);
    }
    return res.status(httpStatus.NOT_FOUND).json({
      code: httpStatus.NOT_FOUND, message: 'Resource not found'
    });
  } catch (error) {
    return next(error);
  }
};