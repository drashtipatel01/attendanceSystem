const mongoose = require('mongoose');

const punchRecordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    type: {
        type: String,
        enum: ['in', 'out'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // punchIn: { type: Date, required: true },
    // punchOut: { type: Date },
    // logs: [
    //     {
    //         type: { type: String, enum: ['punch-in', 'punch-out', 'break-in', 'break-out'] },
    //         timestamp: Date,
    //     },
    // ],
});

module.exports = mongoose.model('PunchRecord', punchRecordSchema);
