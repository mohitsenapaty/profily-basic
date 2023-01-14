const { logger } = require('../../../config/logger');
const httpStatus = require('http-status');
const moment = require('moment');
const Studentacademics = require('../../models/studentacademics.model');

/**
 * Create Studentacademics
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const exists = await Studentacademics.scan({
      schoolid: req.body.schoolid,
      academicprofileid: req.body.academicprofileid,
      studentprofileid: req.body.studentprofileid,
      archived: false,
    }).exec();
    if (exists.length > 0){
      return res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED, message: 'Studentacademics created successfully',
        studentacademics: exists[0],
      });
    }
    const studentacademics = await Studentacademics.createStudentacademics({
      ...req.body, addedby: req.user._id,
      ...(!req.body.userid) && {
        userid: 'unassigned'
      },
    });
    logger.info(studentacademics);
    return res.status(httpStatus.CREATED).json({
      code: httpStatus.CREATED,
      message: 'Studentacademics created successfully',
      studentacademics,
    });
  } catch (error) {
    // TODO: make idempotent by handling unique constraint violation error
    return next(error);
  }
};

/**
 * Read Studentacademics
 * @public
 */
exports.read = async (req, res, next) => {
  try {
    const studentacademics = await Studentacademics.scan({
      _id: req.params.id, archived: false,
    }).exec();

    if (studentacademics) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'Studentacademics fetched successfully',
        studentacademics,
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
 * List Studentacademics
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    logger.info(req.query);
    const studentacademicsList = await Studentacademics.scan({
      ...(req.query.schoolid) && {
        schoolid: {eq: req.query.schoolid}
      },
      ...(req.query.academicprofileid) && {
        academicprofileid: {eq: req.query.academicprofileid}
      },
      ...(req.query.studentprofileid) && {
        studentprofileid: {eq: req.query.studentprofileid}
      },
    }).exec();

    return res.status(httpStatus.OK).json({
      code: httpStatus.OK, message: 'Studentacademics(s) fetched successfully',
      studentacademicsList,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update Studentacademics
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const studentacademics = await Studentacademics.updateStudentacademics(
      {_id: req.params.id,}, ...req.body
    );

    if (studentacademics) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'Studentacademics updated successfully',
        studentacademics,
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
 * Delete Studentacademics
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const studentacademics = await Studentacademics.findOneAndUpdate({
      _id: req.params.id,
      archived: false,
    }, {
      archived: true,
      archivedAt: moment().toISOString(),
    });

    if (studentacademics) {
      return res.status(httpStatus.NO_CONTENT);
    }
    return res.status(httpStatus.NOT_FOUND).json({
      code: httpStatus.NOT_FOUND, message: 'Resource not found'
    });
  } catch (error) {
    return next(error);
  }
};