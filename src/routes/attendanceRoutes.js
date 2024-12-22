const express = require('express');
const { getAttendance, recordPunch } = require('../controllers/attendanceController');

const router = express.Router();

router.get('/:userId', getAttendance);
router.post('/punch', recordPunch);

module.exports = router;
