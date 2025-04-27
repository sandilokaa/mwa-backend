const { HighlightIssues, sequelize } = require("../models");
const { Op } = require("sequelize");

class HighlightIssueRepository {

    /* ------------------- Handle Create Highlight Issue  ------------------- */

    static async handleCreateHighlightIssue ({
        userId,
        productId,
        itemName,
        category,
        pic,
        issue,
        countermeassure,
        dueDate
    }) {
        const highlightIssueCreated = await HighlightIssues.create({
            userId,
            productId,
            itemName,
            category,
            pic,
            issue,
            countermeassure,
            dueDate
        });

        return highlightIssueCreated;
    };

    /* ------------------- End Handle Create Highlight Issue  ------------------- */


    /* ------------------- Handle Get Highlight Issue  ------------------- */

static async handleGetHighlightIssue({ itemName, page, limit }) {
        const offset = (page - 1) * limit;

        const query = {
            where: {},
            attributes: [
                'id',
                'itemName',
                'issue',
                'pic',
                'dueDate',
                'statusIssue'
            ],
            offset,
            limit,
        };
        
        if (itemName) {
            query.where.itemName = {
                [Op.like]: `%${itemName}%`
            };
        }
        

        const result = await HighlightIssues.findAndCountAll(query);

        return {
            highlightDataFiltered: result.rows,
            totalHI: result.count,
            currentPagesHI: page,
            totalPagesHI: Math.ceil(result.count / limit),
        };
    };

    /* ------------------- End Handle Get Highlight Issue  ------------------- */


    /* ------------------- Handle Get Highlight Issue By Id  ------------------- */

    static async handleGetHighlightIssueById({ id }) {
        const query = {
            where: { id },
            attributes: [
                'id',
                'itemName', 
                'issue', 
                'pic', 
                'countermeassure', 
                'dueDate', 
                'statusIssue', 
                'category'
            ],
        };
        
        const getHighlightIssue = HighlightIssues.findOne(query);

        return getHighlightIssue;
    };

    /* ------------------- End Handle Get Highlight Issue By Id  ------------------- */


    /* ------------------- Handle Get Metric Highlight Issue  ------------------- */

    static async handleGetMetricHighlightIssue() {
        const query = {
            where: {},
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('HighlightIssues.id')), 'total']
            ],
        };

        const totalHighlightIssue = await HighlightIssues.findOne(query);

        return totalHighlightIssue ? totalHighlightIssue.get('total') : 0; 
    };

    /* ------------------- End Handle Get Metric Highlight Issue  ------------------- */


    /* ------------------- Handle Delete Highlight Issue By Id  ------------------- */

    static async handleDeleteHighlightIssue({ id }) {

        const deletedIssue = await HighlightIssues.destroy({ where: { id } });

        return deletedIssue;

    };

    /* ------------------- End Handle Delete Highlight Issue By Id  ------------------- */


    /* ------------------- Handle Get Notification  ------------------- */

    static async handleGetNotification({ daysBefore, page, limit }) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const targetDateMin = new Date(today);
        targetDateMin.setDate(today.getDate());

        const targetDateMax = new Date(today);
        targetDateMax.setDate(today.getDate() + daysBefore);
        targetDateMax.setHours(23, 59, 59, 999);

        const offset = (page - 1) * limit;

        const query = {
            where: {
                dueDate: {
                    [Op.gte]: targetDateMin,
                    [Op.lte]: targetDateMax
                },
                statusIssue: {
                    [Op.not]: 'finish'
                }
            },
            attributes: [
                'id',
                'itemName',
                'dueDate',
            ],
            offset,
            limit,
            order: [['dueDate', 'ASC']],
        };

        const result = await HighlightIssues.findAndCountAll(query);

        return {
            data: result.rows,
            total: result.count,
            currentPage: page,
            totalPages: Math.ceil(result.count / limit),
        };
    };

    /* ------------------- End Handle Get Notification  ------------------- */

};

module.exports = HighlightIssueRepository;