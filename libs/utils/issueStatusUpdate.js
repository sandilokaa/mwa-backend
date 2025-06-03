const cron = require('node-cron');
const highlightIssueService = require('../../services/project/highlightIssue/highlightIssueService');

const startIssueStatusUpdater = () => {
    cron.schedule('* * * * *', async () => {
        try {
            await highlightIssueService.updateOverdueHighlightIssue();
            console.log('[CRON] Issue status updated to overdue');
        } catch (error) {
            console.error('[CRON] Failed to update issue statuses', error);
        }
    });
};

module.exports = {
    startIssueStatusUpdater
};
