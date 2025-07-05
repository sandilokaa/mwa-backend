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

};

module.exports = ScheduleService;