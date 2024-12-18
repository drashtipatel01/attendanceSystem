const PunchRecord = require('../models/PunchRecord');
const jwt = require('jsonwebtoken');

const getAttendance = async (req, res) => {
    try {
        const { userId } = req.params;
        const records = await PunchRecord.find({ userId });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const recordPunch = async (req, res) => {
//     try {
//         const { userId, punchIn, punchOut } = req.body;
//         const record = new PunchRecord({ userId, punchIn, punchOut });
//         await record.save();
//         res.status(201).json(record);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


const recordPunch = async (req, res) => {
    try {
        // Extract token from header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided. Unauthorized access.' });
        }

        // Verify token and extract userId
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ error: 'Invalid or expired token.' });
        }

        const userId = decoded.userId;

        // Extract type and createdAt from the request body
        const { type, createdAt } = req.body;

        // Validate the type field
        if (!['in', 'out'].includes(type)) {
            return res.status(400).json({ error: "Invalid type. Must be 'in' or 'out'." });
        }

        // Create a new punch record
        const record = new PunchRecord({
            userId,
            type,
            createdAt: createdAt || Date.now(), // Use provided date or default to now
        });

        const message = type === 'in'
            ? 'Punched In successfully'
            : 'Punched Out successfully';
        await record.save();
        // res.status(201).json(record);
        res.status(201).json({
            message: message
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const recordPunch = async (req, res) => {
//     try {
//         const { userId, type, createdAt } = req.body;

//         // Validate type
//         if (!['in', 'out'].includes(type)) {
//             return res.status(400).json({ error: "Invalid type. Must be 'in' or 'out'." });
//         }

//         // Create a new punch record
//         const record = new PunchRecord({
//             userId,
//             type,
//             createdAt: createdAt || Date.now(), // Use provided date or default to now
//         });

//         await record.save();
//         res.status(201).json(record);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

module.exports = { getAttendance, recordPunch };
