const express = require('express');
const { getAttendance, recordPunch, recordAttendance } = require('../controllers/attendanceController');

const router = express.Router();

router.get('/:userId', getAttendance);
router.post('/punch', recordPunch);
router.post('/attendance', recordAttendance);

module.exports = router;
