const { logger } = require('../../../config/logger');
const httpStatus = require('http-status');
const moment = require('moment');
const Timetable = require('../../models/timetable.model');

/**
 * Create Timetable
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const exists = await Timetable.scan({
      schoolid: req.body.schoolid,
      academicprofileid: req.body.academicprofileid,
      archived: false,
    }).exec();
    if (exists.length > 0){
      return res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED, message: 'Timetable created successfully',
        timetable: exists[0],
      });
    }
    const timetable = await Timetable.createTimetable({
      ...req.body, addedby: req.user._id,
    });
    logger.info(timetable);
    return res.status(httpStatus.CREATED).json({
      code: httpStatus.CREATED,
      message: 'Timetable created successfully',
      timetable,
    });
  } catch (error) {
    // TODO: make idempotent by handling unique constraint violation error
    return next(error);
  }
};

/**
 * Read Timetable
 * @public
 */
exports.read = async (req, res, next) => {
  try {
    const timetable = await Timetable.scan({
      _id: req.params.id, archived: false,
    }).exec();

    if (timetable) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'Timetable fetched successfully',
        timetable,
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
 * List Timetable
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    logger.info(req.query);
    const timetableList = await Timetable.scan({
      ...(req.query.schoolid) && {
        schoolid: {eq: req.query.schoolid}
      },
      ...(req.query.academicprofileid) && {
        academicprofileid: {eq: req.query.academicprofileid}
      },
    }).exec();

    return res.status(httpStatus.OK).json({
      code: httpStatus.OK, message: 'Timetable(s) fetched successfully',
      timetableList,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update Timetable
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const timetable = await Timetable.updateTimetable(
      {_id: req.params.id,}, ...req.body
    );

    if (timetable) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'Timetable updated successfully',
        timetable,
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
 * Delete Timetable
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const timetable = await Timetable.findOneAndUpdate({
      _id: req.params.id,
      archived: false,
    }, {
      archived: true,
      archivedAt: moment().toISOString(),
    });

    if (timetable) {
      return res.status(httpStatus.NO_CONTENT);
    }
    return res.status(httpStatus.NOT_FOUND).json({
      code: httpStatus.NOT_FOUND, message: 'Resource not found'
    });
  } catch (error) {
    return next(error);
  }
};