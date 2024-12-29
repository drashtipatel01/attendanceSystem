const express = require('express');
const { getAttendance, recordAction } = require('../controllers/attendanceController');
const authenticateJWT = require('../authtoken');

const router = express.Router();

router.get('/:userId', getAttendance);

router.post('/attendance', authenticateJWT, recordAction);

module.exports = router;

