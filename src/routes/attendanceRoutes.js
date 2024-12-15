const express = require('express');
const { getAttendance, recordPunch } = require('../controllers/attendanceController');

const router = express.Router();

router.get('/:userId', getAttendance);
router.post('/punch', recordPunch);
router.get('/', (req, res) => {
    res.send('Please provide a userId in the URL.');
});
module.exports = router;
