const cron = require('node-cron');
const recruitmentService = require('../../services/people/recruitmentService');

const startRecruitmentStatusUpdater = () => {
    cron.schedule('* * * * *', async () => {
        try {
        await recruitmentService.updateOverdueRecruitments();
        console.log('[CRON] Recruitment status updated to overdue');
        } catch (error) {
        console.error('[CRON] Failed to update recruitment statuses', error);
        }
    });
};

module.exports = {
    startRecruitmentStatusUpdater
};
