const { Schedules, Products } = require("../../models");
const { Op } = require("sequelize");

class ScheduleRepository {

    /* ------------------- Handle Get Schedule  ------------------- */

    static async handleGetSchedule({ productId }) {

        const query = {
            where: {},
            attributes: [
                'id',
                'productId',
                'scheduleName',
                'pic',
                'startDate',
                'endDate',
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id', 'name'],
                    where: { id: productId }
                },
            ],
        };
        

        const getSchedule = await Schedules.findAll(query);

        return getSchedule;
    };

    /* ------------------- End Handle Get Schedule  ------------------- */


    /* ------------------- Handle Get Last Batch For Product  ------------------- */

    static async handleGetLastBatchForProduct({ productId }) {
        const query = {
            where: { productId },
            attributes: [
                'batch'
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id', 'name'],
                    where: { id: productId }
                },
            ],
            order: [['batch', 'DESC']]
        };
        

        const getLastBatch = await Schedules.findOne(query);

        return getLastBatch;
    };

    /* ------------------- End Handle Get Last Batch For Product  ------------------- */


    /* ------------------- Is Last Batch Finished  ------------------- */

    static async isBatchFinished({ productId, getLastBatch }) {
        const query = {
            where: {
                productId, 
                batch: getLastBatch,
            },
            attributes: [
                'id',
                'productId',
                'batch',
                'statusSchedule'
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id', 'name'],
                    where: { id: productId }
                },
            ],
        };

        const result = await Schedules.findAll(query);

        return result;
    };

    /* ------------------- End Is Last Batch Finished  ------------------- */


    /* ------------------- Handle Create Schedule  ------------------- */

    static async handleCreateSchedule ({
        userId,
        productId,
        scheduleName,
        pic,
        startDate,
        endDate
    }) {
        const scheduleCreated = await Schedules.create({
            userId,
            productId,
            scheduleName,
            pic,
            startDate,
            endDate
        });

        return scheduleCreated;
    };

    /* ------------------- End Handle Create Schedule  ------------------- */

};

module.exports = ScheduleRepository;