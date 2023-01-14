const { logger } = require('../../../config/logger');
const httpStatus = require('http-status');
const moment = require('moment');
const Teacheracademics = require('../../models/teacheracademics.model');

/**
 * Create Teacheracademics
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const exists = await Teacheracademics.scan({
      schoolid: req.body.schoolid,
      academicprofileid: req.body.academicprofileid,
      teacherprofileid: req.body.teacherprofileid,
      archived: false,
    }).exec();
    if (exists.length > 0){
      return res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED, message: 'Teacheracademics created successfully',
        teacheracademics: exists[0],
      });
    }
    const teacheracademics = await Teacheracademics.createTeacheracademics({
      ...req.body, addedby: req.user._id,
      ...(!req.body.userid) && {
        userid: 'unassigned'
      },
    });
    logger.info(teacheracademics);
    return res.status(httpStatus.CREATED).json({
      code: httpStatus.CREATED,
      message: 'Teacheracademics created successfully',
      teacheracademics,
    });
  } catch (error) {
    // TODO: make idempotent by handling unique constraint violation error
    return next(error);
  }
};

/**
 * Read Teacheracademics
 * @public
 */
exports.read = async (req, res, next) => {
  try {
    const teacheracademics = await Teacheracademics.scan({
      _id: req.params.id, archived: false,
    }).exec();

    if (teacheracademics) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'Teacheracademics fetched successfully',
        teacheracademics,
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
 * List Teacheracademics
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    logger.info(req.query);
    const teacheracademicsList = await Teacheracademics.scan({
      ...(req.query.schoolid) && {
        schoolid: {eq: req.query.schoolid}
      },
      ...(req.query.academicprofileid) && {
        academicprofileid: {eq: req.query.academicprofileid}
      },
      ...(req.query.teacherprofileid) && {
        teacherprofileid: {eq: req.query.teacherprofileid}
      },
    }).exec();

    return res.status(httpStatus.OK).json({
      code: httpStatus.OK, message: 'Teacheracademics(s) fetched successfully',
      teacheracademicsList,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update Teacheracademics
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const teacheracademics = await Teacheracademics.updateTeacheracademics(
      {_id: req.params.id,}, ...req.body
    );

    if (teacheracademics) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'Teacheracademics updated successfully',
        teacheracademics,
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
 * Delete Teacheracademics
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const teacheracademics = await Teacheracademics.findOneAndUpdate({
      _id: req.params.id,
      archived: false,
    }, {
      archived: true,
      archivedAt: moment().toISOString(),
    });

    if (teacheracademics) {
      return res.status(httpStatus.NO_CONTENT);
    }
    return res.status(httpStatus.NOT_FOUND).json({
      code: httpStatus.NOT_FOUND, message: 'Resource not found'
    });
  } catch (error) {
    return next(error);
  }
};