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


    /* ------------------- Handle Get Schedule By Id  ------------------- */

    static async handleGetScheduleById({ id }) {

        const query = {
            where: {id},
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
                },
            ],
        };
        

        const getSchedule = await Schedules.findOne(query);

        return getSchedule;
    };

    /* ------------------- End Handle Get Schedule By Id  ------------------- */


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


    /* ------------------- Handle Update Schedule  ------------------- */

    static async handleUpdateScheduleById({ 
        id, 
        productId,
        scheduleName,
        pic,
        startDate,
        endDate
    }) {
        const updatedSchedule = await Schedules.update({
            productId,
            scheduleName,
            pic,
            startDate,
            endDate
        }, {
            where: { id }
        });

        return updatedSchedule;
    };

    /* ------------------- End Handle Update Schedule  ------------------- */


    /* ------------------- Handle Delete Schedule By Id  ------------------- */

    static async handleDeleteScheduleById({ id }) {

        const deletedSchedule = await Schedules.destroy({ where: { id } });

        return deletedSchedule;

    };

    /* ------------------- End Handle Delete Schedule By Id  ------------------- */

};

module.exports = ScheduleRepository;