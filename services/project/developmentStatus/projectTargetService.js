const projectTargetRepository = require("../../../repositories/project/developmentStatus/projectTargetRepository");
const fileRemove = require("../../../libs/utils/fileRemove");

class ProjectTargetService {

    /* ------------------- Handle Create Project Target ------------------- */

    static async handleCreateProjectTarget ({
        userId,
        projectTargetId,
        productId,
        name,
        information,
        picture
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const requiredFields = {
                productId,
                name,
                information
            };
            
            const formatFieldName = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            for (const [key, value] of Object.entries(requiredFields)) {
                if (!value) {
                    return {
                        status: false,
                        status_code: 400,
                        message: `${formatFieldName(key)} is required!`,
                        data: {
                            projectTarget: null,
                        },
                    };
                }
            }
            // ------------------------- End Payload Validation ------------------------- //

            const projectTargetCreated = await projectTargetRepository.handleCreateProjectTarget({
                userId,
                productId,
                name,
                information
            });

            const projectTargetImageCreated = await projectTargetRepository.handleCreateProjectTargetImages({
                projectTargetId: projectTargetCreated.id,
                picture
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created data",
                data: {
                    projectTarget: projectTargetCreated,
                    projectTargetImage: projectTargetImageCreated
                },
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    projectTarget: null,
                    projectTargetImage: null
                },
            }
        }
    };

    /* ------------------- End Handle Create Project Target  ------------------- */


    /* ------------------- Handle Get Project Target ------------------- */

    static async handleGetProjectTarget({ productId }) {
        try {
            const getProjectTarget = await projectTargetRepository.handleGetProjectTarget({ productId });

            return {
                status: true,
                status_code: 200,
                message: "Successfully displayed project target",
                data: {
                    projectTarget: getProjectTarget
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    projectTarget: null
                },
            }
        }
    };

    /* ------------------- End Handle Get Project Target ------------------- */


    /* ------------------- Handle Get Project Target By Id  ------------------- */

    static async handleGetProjectTargetById({ id }) {
        try {
            const getProjectTargetById = await projectTargetRepository.handleGetProjectTargetById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    projectTarget: getProjectTargetById,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    projectTarget: null,
                },
            };
        }
    };

    /* ------------------- End Handle Get Project Target By Id  ------------------- */

};

module.exports = ProjectTargetService;