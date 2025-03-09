const express = require('express');
const { getAttendance, recordAction, getUserStatus, getAttendanceRecord, getReport, calculateRemainingHour } = require('../controllers/attendanceController');
const authenticateJWT = require('../authtoken');

const router = express.Router();

router.get('/:userId', getAttendance);
router.post('/attendance', authenticateJWT, recordAction);
router.get('/userStatus/:userId', authenticateJWT, getUserStatus);
router.get('/attendanceRecord/:userId', authenticateJWT, getAttendanceRecord);
router.get('/report/:userId', authenticateJWT, getReport);
router.get('/calculateRemainingHour/:userId', authenticateJWT, calculateRemainingHour);

module.exports = router;

