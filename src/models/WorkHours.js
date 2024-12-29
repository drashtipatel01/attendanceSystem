const mongoose = require('mongoose');

const workSettingsSchema = new mongoose.Schema({
    requiredWorkHours: { type: Number, default: 8 }, // Default 8 hours
    weekends: { type: [String], default: ['Saturday', 'Sunday'] }, // Default weekends
    lastSaturdayWorking: { type: Boolean, default: true }, // Last Saturday working
});

module.exports = mongoose.model('WorkSettings', workSettingsSchema);
