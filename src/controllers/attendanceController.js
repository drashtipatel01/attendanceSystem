const PunchRecord = require('../models/PunchRecord');

// Get user attendance
const getAttendance = async (req, res) => {
    try {
        const { userId } = req.params;
        const records = await PunchRecord.find({ userId });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Record punch-in or punch-out
const recordPunch = async (req, res) => {
    try {
        const { userId, punchIn, punchOut } = req.body;
        const record = new PunchRecord({ userId, punchIn, punchOut });
        await record.save();
        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAttendance, recordPunch };
