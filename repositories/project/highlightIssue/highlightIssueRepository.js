const { HighlightIssues, sequelize, Products } = require("../../../models");
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

static async handleGetHighlightIssue({ productId, itemName, page, limit }) {
        const offset = (page - 1) * limit;

        const query = {
            where: {},
            attributes: [
                'id',
                'itemName',
                'issue',
                'pic',
                'dueDate',
                'revisionDate',
                'statusIssue'
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id', 'name'],
                    where: { id: productId }
                },
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
                'productId',
                'itemName', 
                'issue', 
                'pic', 
                'countermeassure', 
                'dueDate', 
                'revisionDate',
                'statusIssue', 
                'category'
            ],
        };
        
        const getHighlightIssue = HighlightIssues.findOne(query);

        return getHighlightIssue;
    };

    /* ------------------- End Handle Get Highlight Issue By Id  ------------------- */


    /* ------------------- Handle Get Metric Highlight Issue  ------------------- */

    static async handleGetMetricHighlightIssue({ productId }) {
        const query = {
            where: {},
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('HighlightIssues.id')), 'total']
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id'],
                    where: { id: productId }
                },
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

    static async handleGetNotification({ productId, daysBefore, page, limit }) {
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
                [Op.or]: [
                    {
                        dueDate: {
                            [Op.gte]: targetDateMin,
                            [Op.lte]: targetDateMax
                        },
                    }, {
                        revisionDate: {
                            [Op.gte]: targetDateMin,
                            [Op.lte]: targetDateMax
                        },
                    }
                ],
                statusIssue: {
                    [Op.not]: 'done'
                }
            },
            attributes: [
                'id',
                'itemName',
                'dueDate',
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id'],
                    where: { id: productId }
                },
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


    /* ------------------- Handle Update Highlight Issue  ------------------- */

    static async handleUpdateHighlightIssue({ 
        id, 
        productId,
        itemName,
        category,
        pic,
        issue,
        countermeassure,
        dueDate
    }) {
        const updatedIssue = await HighlightIssues.update({
            productId,  
            itemName,
            category,
            pic,
            issue,
            countermeassure,
            dueDate
        }, {
            where: { id }
        });

        return updatedIssue;
    };

    /* ------------------- End Handle Update Highlight Issue  ------------------- */


    /* ------------------- Handle Update Status Highlight Issue  ------------------- */

    static async handleUpdateStatusHighlightIssue({ 
        id,
        statusIssue
    }) {
        const updatedIssue = await HighlightIssues.update({
            statusIssue
        }, {
            where: { id }
        });

        return updatedIssue;
    };

    /* ------------------- End Handle Update Status Highlight Issue  ------------------- */


    /* ------------------- Handle Update Status Highlight Issue  ------------------- */

    static async updateOverdueHighlightIssue() {
        return HighlightIssues.update(
            { statusIssue: 'overdue' },
            {
                where: {
                    statusIssue: 'on progress',
                    dueDate: {
                        [Op.lt]: new Date(),
                    },
                },
            }
        );
    };

    /* ------------------- End Handle Update Status Highlight Issue  ------------------- */


    /* ------------------- Handle Get Summary Highlight Issue  ------------------- */

    static async handleGetSummaryHighlightIssue({ productId }) {
        const query = {
            where: {},
            attributes: [
                'pic',
                [sequelize.fn('COUNT', sequelize.col('pic')), 'count']
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id'],
                    where: { id: productId }
                },
            ],
            group: ['pic']
        };

        const getSummary = await HighlightIssues.findAll(query);

        return getSummary;
    };

    /* ------------------- End Handle Get Summary Highlight Issue  ------------------- */


    /* ------------------- Handle Revision Date Highlight Issue  ------------------- */

    static async handleRevisionDateHighilightIssue({ 
        id,
        revisionDate,
        statusIssue
    }) {
        const updatedRevisionDate = await HighlightIssues.update({
            revisionDate,
            statusIssue
        }, {
            where: { id }
        });

        return updatedRevisionDate;
    };

    /* ------------------- End Handle Revision Date Highlight Issue  ------------------- */

};

module.exports = HighlightIssueRepository;