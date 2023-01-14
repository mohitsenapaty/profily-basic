const { logger } = require('../../../config/logger');
const httpStatus = require('http-status');
const moment = require('moment');
const Studentprofile = require('../../models/studentprofile.model');

/**
 * Create Studentprofile
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const exists = await Studentprofile.scan({
      schoolid: req.body.schoolid,
      admissionid: req.body.admissionid,
      archived: false,
    }).exec();
    if (exists.length > 0){
      return res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED, message: 'Studentprofile created successfully',
        studentprofile: exists[0],
      });
    }
    const studentprofile = await Studentprofile.createStudentprofile({
      ...req.body, addedby: req.user._id,
      ...(!req.body.userid) && {
        userid: 'unassigned'
      },
    });
    logger.info(studentprofile);
    return res.status(httpStatus.CREATED).json({
      code: httpStatus.CREATED, message: 'Studentprofile created successfully', studentprofile
    });
  } catch (error) {
    // TODO: make idempotent by handling unique constraint violation error
    return next(error);
  }
};

/**
 * Read Studentprofile
 * @public
 */
exports.read = async (req, res, next) => {
  try {
    const studentprofile = await Studentprofile.scan({
      _id: req.params.id, archived: false,
    }).exec();

    if (studentprofile) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'Studentprofile fetched successfully',
        studentprofile,
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
 * List Studentprofile
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    logger.info(req.query);
    const studentprofiles = await Studentprofile.scan({
      ...(req.query.schoolid) && {
        schoolid: {eq: req.query.schoolid}
      },
      ...(req.query.userid) && {
        userid: {eq: req.query.userid}
      },
      ...(req.query.admissionid) && {
        admissionid: {eq: req.query.admissionid}
      },
      ...(req.query.studentname) && {
        studentname: {eq: req.query.studentname}
      },
      ...(req.query.studentemail) && {
        studentemail: {eq: req.query.studentemail}
      },
      ...(req.query.studentphone) && {
        studentphone: {eq: req.query.studentphone}
      },
      ...(req.query.dob) && {
        dob: {eq: req.query.dob}
      },
      ...(req.query.guardianname) && {
        guardianname: {eq: req.query.guardianname}
      },
      ...(req.query.joindate) && {
        joindate: {eq: req.query.joindate}
      },
      ...(req.query.reference) && {
        reference: {eq: req.query.reference}
      },
    }).exec();

    return res.status(httpStatus.OK).json({
      code: httpStatus.OK, message: 'Studentprofile(s) fetched successfully',
      studentprofiles,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Update Studentprofile
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const studentprofile = await Studentprofile.updateStudentprofile(
      {_id: req.params.id,}, ...req.body
    );

    if (studentprofile) {
      return res.status(httpStatus.OK).json({
        code: httpStatus.OK, message: 'Studentprofile updated successfully',
        studentprofile,
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
 * Delete Studentprofile
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const studentprofile = await Studentprofile.findOneAndUpdate({
      _id: req.params.id,
      archived: false,
    }, {
      archived: true,
      archivedAt: moment().toISOString(),
    });

    if (studentprofile) {
      return res.status(httpStatus.NO_CONTENT);
    }
    return res.status(httpStatus.NOT_FOUND).json({
      code: httpStatus.NOT_FOUND, message: 'Resource not found'
    });
  } catch (error) {
    return next(error);
  }
};