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


    /* ------------------- Handle Update Project Target By Id  ------------------- */

    static async handleUpdateProjectTargetById ({ 
        id,
        productId,
        name,
        information,
        deletedImageId,
        picture,
        updatedImage
    }) {
        try {
            const getProjectTargetById = await projectTargetRepository.handleGetProjectTargetById({ id });

            if (getProjectTargetById.id == id) {
                if (!productId) productId = getProjectTargetById.productId
                if (!name) name = getProjectTargetById.name
                if (!information) information = getProjectTargetById.information
            }

            const updatedProjectTarget = await projectTargetRepository.handleUpdateProjectTargetById({
                id,
                productId,
                name,
                information
            });

            let projectTargetImageCreated = [];

            if (picture && picture.length > 0) {
                projectTargetImageCreated = await projectTargetRepository.handleCreateProjectTargetImages({
                    projectTargetId: getProjectTargetById.id,
                    picture
                });
            }

            if (deletedImageId && deletedImageId.length > 0) {
                const idsToDelete = Array.isArray(deletedImageId)
                    ? deletedImageId.map(id => Number(id))
                    : [Number(deletedImageId)];

                for (const imageId of idsToDelete) {
                    if (imageId === undefined) continue;
                    const image = await projectTargetRepository.handleGetProjectTargetImageById({ imageId });
                    if (image) {
                        await projectTargetRepository.handleDeleteProjectTargetImageById({ imageId });
                        fileRemove(image.picture);
                    }
                }
            }

            if (updatedImage && updatedImage.length > 0) {
                for (const item of updatedImage) {
                    const { imageId, newImagePath } = item;
                    if (!imageId || isNaN(Number(imageId))) continue;
                    const image = await projectTargetRepository.handleGetProjectTargetImageById({ imageId });
                    if (image) {
                        fileRemove(image.picture);

                        await projectTargetRepository.handleUpdateProjectTargetImageById({
                            imageId,
                            picture: newImagePath
                        });
                    }
                }
            }

            return {
                status: true,
                status_code: 201,
                message: "Successfully updated data",
                data: {
                    projectTarget: updatedProjectTarget
                },
            }
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

    /* ------------------- End Handle Update Project Target By Id  ------------------- */

};

module.exports = ProjectTargetService;