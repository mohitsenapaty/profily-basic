const { logger } = require('../../../config/logger');
const httpStatus = require('http-status');
const moment = require('moment');
const Academicprofile = require('../../models/academicprofile.model');

/**
 * Create Academicprofile
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const exists = await Academicprofile.scan({
      schoolid: req.body.schoolid,
      session: req.body.session,
      archived: false,
    }).exec();
    if (exists.length > 0){
      return res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED, message: 'Academicprofile created successfully',
        academicprofile: exists[0],
      });
    }
    const academicprofile = await Academicprofile.createAcademicprofile({
      ...req.body, addedby: req.user._id,
    });
    logger.info(academicprofile);
    return res.status(httpStatus.CREATED).json({
      code: httpStatus.CREATED, message: 'Academicprofile created successfully', academicprofile
    });
  } catch (error) {
    // TODO: make idempotent by handling unique constraint violation error
    return next(error);
  }
};

/**
 * Read Academicprofile
 * @public
 */
exports.read = async (req, res, next) => {
  try {
    const academicprofile = await Academicprofile.scan({
      _id: req.params.id, archived: false,
    }).exec();

    if (academicprofile) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'Academicprofile fetched successfully',
        academicprofile,
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
 * List Academicprofile
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    logger.info(req.query);
    const academicprofiles = await Academicprofile.scan({
      ...(req.query.schoolid) && {
        schoolid: {eq: req.query.schoolid}
      },
      ...(req.query.session) && {
        session: {eq: req.query.session}
      },
    }).exec();

    return res.status(httpStatus.OK).json({
      code: httpStatus.OK, message: 'Academicprofile(s) fetched successfully',
      academicprofiles,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update Academicprofile
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const academicprofile = await Academicprofile.updateAcademicprofile(
      {_id: req.params.id,}, ...req.body
    );

    if (academicprofile) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'Academicprofile updated successfully',
        academicprofile,
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
 * Delete Academicprofile
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const academicprofile = await Academicprofile.findOneAndUpdate({
      _id: req.params.id,
      archived: false,
    }, {
      archived: true,
      archivedAt: moment().toISOString(),
    });

    if (academicprofile) {
      return res.status(httpStatus.NO_CONTENT);
    }
    return res.status(httpStatus.NOT_FOUND).json({
      code: httpStatus.NOT_FOUND, message: 'Resource not found'
    });
  } catch (error) {
    return next(error);
  }
};