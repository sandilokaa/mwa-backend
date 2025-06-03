const cron = require('node-cron');
const procurementService = require('../../services/project/developmentStatus/procurementService');

const startProcurementStatusUpdater = () => {
    cron.schedule('* * * * *', async () => {
        try {
        await procurementService.updateOverdueProcurements();
        console.log('[CRON] Procurement status updated to overdue');
        } catch (error) {
        console.error('[CRON] Failed to update procurement statuses', error);
        }
    });
};

module.exports = {
    startProcurementStatusUpdater
};
