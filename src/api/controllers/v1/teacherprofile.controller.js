const { logger } = require('../../../config/logger');
const httpStatus = require('http-status');
const moment = require('moment');
const Teacherprofile = require('../../models/teacherprofile.model');

/**
 * Create Teacherprofile
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const exists = await Teacherprofile.scan({
      schoolid: req.body.schoolid,
      employmentid: req.body.employmentid,
      archived: false,
    }).exec();
    if (exists.length > 0){
      return res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED, message: 'Teacherprofile created successfully',
        teacherprofile: exists[0],
      });
    }
    const teacherprofile = await Teacherprofile.createTeacherprofile({
      ...req.body, addedby: req.user._id,
      ...(!req.body.userid) && {
        userid: 'unassigned'
      },
    });
    logger.info(teacherprofile);
    return res.status(httpStatus.CREATED).json({
      code: httpStatus.CREATED, message: 'Teacherprofile created successfully', teacherprofile
    });
  } catch (error) {
    // TODO: make idempotent by handling unique constraint violation error
    return next(error);
  }
};

/**
 * Read Teacherprofile
 * @public
 */
exports.read = async (req, res, next) => {
  try {
    const teacherprofile = await Teacherprofile.scan({
      _id: req.params.id, archived: false,
    }).exec();

    if (teacherprofile) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'Teacherprofile fetched successfully',
        teacherprofile,
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
 * List Teacherprofile
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    logger.info(req.query);
    const teacherprofiles = await Teacherprofile.scan({
      ...(req.query.schoolid) && {
        schoolid: {eq: req.query.schoolid}
      },
      ...(req.query.userid) && {
        userid: {eq: req.query.userid}
      },
      ...(req.query.employmentid) && {
        employmentid: {eq: req.query.employmentid}
      },
      ...(req.query.teachername) && {
        teachername: {eq: req.query.teachername}
      },
      ...(req.query.nickname) && {
        nickname: {eq: req.query.nickname}
      },
      ...(req.query.joindate) && {
        joindate: {eq: req.query.joindate}
      },
      ...(req.query.reference) && {
        reference: {eq: req.query.reference}
      },
    }).exec();

    return res.status(httpStatus.OK).json({
      code: httpStatus.OK, message: 'Teacherprofile(s) fetched successfully',
      teacherprofiles,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update Teacherprofile
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const teacherprofile = await Teacherprofile.updateTeacherprofile(
      {_id: req.params.id,}, ...req.body
    );

    if (teacherprofile) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'Teacherprofile updated successfully',
        teacherprofile,
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
 * Delete Teacherprofile
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const teacherprofile = await Teacherprofile.findOneAndUpdate({
      _id: req.params.id,
      archived: false,
    }, {
      archived: true,
      archivedAt: moment().toISOString(),
    });

    if (teacherprofile) {
      return res.status(httpStatus.NO_CONTENT);
    }
    return res.status(httpStatus.NOT_FOUND).json({
      code: httpStatus.NOT_FOUND, message: 'Resource not found'
    });
  } catch (error) {
    return next(error);
  }
};