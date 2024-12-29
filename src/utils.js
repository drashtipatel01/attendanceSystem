const WorkSettings = require('../src/models/WorkHours'); // Import WorkSettings model

const getRequiredHours = async () => {
    const settings = await WorkSettings.findOne();
    return settings ? settings.requiredWorkHours : 8;
};

const calculateWorkHours = (punchIn, punchOut, breaks) => {
    let total = (new Date(punchOut) - new Date(punchIn)) / (1000 * 60 * 60);
    breaks?.forEach(b => {
        if (b?.breakIn && b?.breakOut) {
            total -= (new Date(b?.breakOut) - new Date(b?.breakIn)) / (1000 * 60 * 60);
        }
    });
    return { total: Math.max(0, total) };
};
module.exports = { getRequiredHours, calculateWorkHours };
