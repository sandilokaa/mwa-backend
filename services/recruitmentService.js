const recruitmentRepository = require("../repositories/recruitmentRepository");

class RecruitmentService {

    /* ------------------- Handle Create Recruitment  ------------------- */

    static async handleCreateRecruitment ({
        userId,
        name,
        position,
        division,
        submissionDate,
        joinDate
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const requiredFields = {
                name,
                position,
                division,
                submissionDate,
                joinDate
            };
            
            const formatFieldName = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            for (const [key, value] of Object.entries(requiredFields)) {
                if (!value) {
                    return {
                        status: false,
                        status_code: 400,
                        message: `${formatFieldName(key)} is required!`,
                        data: {
                            recruitment: null,
                        },
                    };
                }
            }
            // ------------------------- End Payload Validation ------------------------- //

            const recruitmentCreated = await recruitmentRepository.handleCreateRecruitment({
                userId,
                name,
                position,
                division,
                submissionDate,
                joinDate
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created data",
                data: {
                    recruitment: recruitmentCreated
                },
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    recruitment: null
                },
            }
        }
    };

    /* ------------------- End Handle Create Recruitment  ------------------- */


    /* ------------------- Handle Get Recruitment  ------------------- */

    static async handleGetRecruitment({ name, page, limit }) {
        try {
            const getRecruitment = await recruitmentRepository.handleGetRecruitment({ name, page, limit });

            return {
                status: true,
                status_code: 200,
                message: "Successfully displayed recruitment",
                data: {
                    recruitment: getRecruitment
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    recruitment: null
                },
            }
        }
    };

    /* ------------------- End Handle Get Recruitment  ------------------- */


    /* ------------------- Handle Get Recruitment By Id  ------------------- */

    static async handleGetRecruitmentById({ id }) {
        try {
            const getRecruitmentById = await recruitmentRepository.handleGetRecruitmentById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    recruitment: getRecruitmentById,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    recruitment: null,
                },
            };
        }
    };

    /* ------------------- End Handle Get Recruitment By Id  ------------------- */


    /* ------------------- Handle Get Metric Recruitment  ------------------- */

    static async handleGetMetricRecruitment() {
        try {
            const getMetrics = await recruitmentRepository.handleGetMetricRecruitment();
        
            return {
                status: true,
                status_code: 200,
                message: 'Summary fetched successfully',
                data: {
                    recruitment: getMetrics,
                }
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    recruitment: null,
                }
            };
        }
    };

    /* ------------------- End Handle Get Metric Recruitment  ------------------- */


    /* ------------------- Handle Delete Recruitment By Id  ------------------- */

    static async handleDeleteRecruitmentById({ id }) {
        try {
            const deletedRecruitment = await recruitmentRepository.handleDeleteRecruitmentById({ id });

            return {
                status: true,
                status_code: 201,
                message: "Data deleted successfully",
                data: {
                    recruitment: deletedRecruitment
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    recruitment: null,
                },
            };
        }
    };

    /* ------------------- End Handle Delete Recruitment By Id  ------------------- */


    /* ------------------- Handle Update Recruitment By Id  ------------------- */

    static async handleUpdateRecruitment({ 
        id,
        name,
        position,
        division,
        submissionDate,
        joinDate
    }) {
        try {

            const getRecruitmentById = await recruitmentRepository.handleGetRecruitmentById({ id });

            if (getRecruitmentById.id == id) {
                if (!name) name = getRecruitmentById.name;
                if (!position) position = getRecruitmentById.position;
                if (!division) division = getRecruitmentById.division;
                if (!submissionDate) submissionDate = getRecruitmentById.submissionDate;
                if (!joinDate) joinDate = getRecruitmentById.joinDate;
            }

            const updatedRecruitment = await recruitmentRepository.handleUpdateRecruitment({ 
                id,
                name,
                position,
                division,
                submissionDate,
                joinDate
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    recruitment: updatedRecruitment
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    recruitment: null,
                },
            };
        }
    };

    /* ------------------- End Handle Update Recruitment By Id  ------------------- */


    /* ------------------- Handle Get Notification  ------------------- */

    static async handleGetNotification({ daysBefore, page, limit }) {
        try {
            const getNotification = await recruitmentRepository.handleGetNotification({ daysBefore, page, limit });
        
            return {
                status: true,
                status_code: 200,
                message: 'Notification fetched successfully',
                data: {
                    recruitment: getNotification,
                }
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    recruitment: null,
                }
            };
        }
    };

    /* ------------------- End Handle Get Notification  ------------------- */


    /* ------------------- Handle Update Status Recruitment  ------------------- */

    static async updateOverdueRecruitments() {
        try {
            return recruitmentRepository.updateOverdueRecruitments();
        } catch (error) {
            console.log(error.message);
        }
    }

    /* ------------------- End Handle Update Status Recruitment  ------------------- */


    /* ------------------- Handle Update Progress Recruitment  ------------------- */

    static async handleUpdateProgressRecruitment({ 
        id,
        progress
    }) {
        try {

            const getRecruitmentById = await recruitmentRepository.handleGetRecruitmentById({ id });

            if (getRecruitmentById.id == id) {
                if (!progress) progress = getRecruitmentById.progress;
            }

            let statusRec = getRecruitmentById.statusRec;
            if (progress === "offer letter") {
                statusRec = "done"
            } else if (statusRec !== "overdue") {
                statusRec = "on progress"
            }

            const updatedRecruitment = await recruitmentRepository.handleUpdateProgressRecruitment({ 
                id,
                progress,
                statusRec
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    recruitment: updatedRecruitment
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    recruitment: null,
                },
            };
        }
    };

    /* ------------------- End Handle Update Progress Recruitment  ------------------- */


    /* ------------------- Handle Get Summary Recruitment  ------------------- */

    static async handleGetSummaryRecruitment() {
        try {
            const getSummary = await recruitmentRepository.handleGetSummaryRecruitment();
        
            return {
                status: true,
                status_code: 200,
                message: 'Summary fetched successfully',
                data: {
                    recruitment: getSummary,
                }
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    recruitment: null,
                }
            };
        }
    };

    /* ------------------- End Handle Get Summary Recruitment  ------------------- */

};

module.exports = RecruitmentService;