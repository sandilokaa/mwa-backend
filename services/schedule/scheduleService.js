const scheduleRepository = require("../../repositories/schedule/scheduleRepository");

class ScheduleService {

    /* ------------------- Handle Get Schedule  ------------------- */

    static async handleGetSchedule({ productId }) {
        try {
            const getSchedule = await scheduleRepository.handleGetSchedule({ productId });

            return {
                status: true,
                status_code: 200,
                message: "Successfully displayed schedule",
                data: {
                    schedule: getSchedule
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    schedule: null
                },
            }
        }
    };

    /* ------------------- End Handle Get Schedule  ------------------- */


    /* ------------------- Handle Create Schedule  ------------------- */

    static async handleCreateSchedule ({
        userId,
        productId,
        scheduleName,
        pic,
        startDate,
        endDate
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const requiredFields = {
                productId,
                scheduleName,
                pic,
                startDate,
                endDate
            };
            
            const formatFieldName = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            for (const [key, value] of Object.entries(requiredFields)) {
                if (!value) {
                    return {
                        status: false,
                        status_code: 400,
                        message: `${formatFieldName(key)} is required!`,
                        data: {
                            schedule: null,
                        },
                    };
                }
            }
            // ------------------------- End Payload Validation ------------------------- //

            const scheduleCreated = await scheduleRepository.handleCreateSchedule({
                userId,
                productId,
                scheduleName,
                pic,
                startDate,
                endDate
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created data",
                data: {
                    schedule: scheduleCreated
                },
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    schedule: null
                },
            }
        }
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
        try {

            const getScheduleById = await scheduleRepository.handleGetScheduleById({ id });

            if (getScheduleById.id == id) {
                if (!productId) productId = getScheduleById.productId;
                if (!scheduleName) scheduleName = getScheduleById.scheduleName;
                if (!pic) pic = getScheduleById.pic;
                if (!startDate) startDate = getScheduleById.startDate;
                if (!endDate) endDate = getScheduleById.endDate;
            }

            const updatedSchedule = await scheduleRepository.handleUpdateScheduleById({ 
                id, 
                productId,
                scheduleName,
                pic,
                startDate,
                endDate
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    schedule: updatedSchedule
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    schedule: null,
                },
            };
        }
    };

    /* ------------------- End Handle Update Schedule  ------------------- */


    /* ------------------- Handle Delete Schedule By Id  ------------------- */

    static async handleDeleteScheduleById({ id }) {
        try {
            const deletedSchedule = await scheduleRepository.handleDeleteScheduleById({ id });

            return {
                status: true,
                status_code: 201,
                message: "Data deleted successfully",
                data: {
                    schedule: deletedSchedule
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    schedule: null,
                },
            };
        }
    };

    /* ------------------- End Handle Delete Schedule By Id  ------------------- */


    /* ------------------- Handle Get Schedule By Id  ------------------- */

    static async handleGetScheduleById({ id }) {
        try {
            const getScheduleById = await scheduleRepository.handleGetScheduleById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    schedule: getScheduleById,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    schedule: null,
                },
            };
        }
    };

    /* ------------------- End Handle Get Schedule By Id  ------------------- */

};

module.exports = ScheduleService;