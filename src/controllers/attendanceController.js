const PunchRecord = require('../models/PunchRecord');
const jwt = require('jsonwebtoken');
const { calculateWorkHours, getRequiredHours } = require('../utils');

const getAttendance = async (req, res) => {
    try {
        const { userId } = req.params;
        const records = await PunchRecord.find({ userId });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const recordAction = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized access.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const { type } = req.body;
        const validTypes = ['punchIn', 'punchOut', 'breakIn', 'breakOut'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({ error: 'Invalid action type.' });
        }
        const now = new Date();
        const today = new Date(now.toISOString().split('T')[0]);
        let record = await PunchRecord.findOne({ userId, date: today });
        if (!record && type === 'punchIn') {
            record = new PunchRecord({ userId, date: today });
        }

        if (type === 'punchIn') {
            if (!record.punchIn) {
                record.punchIn = now;
            } else {
                return res.status(400).json({ error: 'Already punched in today.' });
            }
        } else if (type === 'punchOut') {
            if (record && record.punchIn && !record.punchOut) {
                record.punchOut = now;
                const workHours = calculateWorkHours(record.punchIn, record.punchOut, record.breaks);
                record.totalWorkHours = workHours.total;
                record.isLessHours = workHours.total < (await getRequiredHours());
            } else {
                return res.status(400).json({ error: 'Invalid punch-out action.' });
            }
        } else if (type === 'breakIn') {
            if (record) {
                record.breaks.push({ breakIn: now });
            } else {
                return res.status(400).json({ error: 'Punch in before starting a break.' });
            }
        } else if (type === 'breakOut') {
            if (record && record.breaks.length > 0) {
                const lastBreak = record.breaks[record.breaks.length - 1];
                if (lastBreak && !lastBreak.breakOut) {
                    lastBreak.breakOut = now;
                } else {
                    return res.status(400).json({ error: 'Invalid break-out action.' });
                }
            } else {
                return res.status(400).json({ error: 'No ongoing break to end.' });
            }
        }
        await record.save();
        res.status(201).json({ message: `Action ${type} recorded successfully.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAttendance, recordAction };
