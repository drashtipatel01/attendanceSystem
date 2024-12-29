const mongoose = require('mongoose');

const punchRecordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    punchIn: { type: Date },
    punchOut: { type: Date },
    breaks: [
        {
            breakIn: Date,
            breakOut: Date,
        }
    ],
    totalWorkHours: { type: Number, default: 0 },
    isLessHours: { type: Boolean, default: false }, 
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('PunchRecord', punchRecordSchema);
