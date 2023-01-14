const express = require('express');
const clientRoutes = require('./client.routes');
const schoolRoutes = require('./school.routes');
const studentprofileRoutes = require('./studentprofile.routes');
const teacherprofileRoutes = require('./teacherprofile.routes');
const academicprofileRoutes = require('./academicprofile.routes');

const router = express.Router();

/**
 * API Routes
 */
router.use('/api/v1/client', clientRoutes);
router.use('/api/v1/school', schoolRoutes);
router.use('/api/v1/studentprofile', studentprofileRoutes);
router.use('/api/v1/teacherprofile', teacherprofileRoutes);
router.use('/api/v1/academicprofile', academicprofileRoutes);

module.exports = router;