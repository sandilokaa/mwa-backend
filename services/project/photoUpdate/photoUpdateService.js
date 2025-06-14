const photoUpdateRepository = require("../../../repositories/project/photoUpdate/photoUpdateRepository");
const fileRemove = require("../../../libs/utils/fileRemove");

class PhotoUpdateService {

    /* ------------------- Handle Create Photo Update  ------------------- */

    static async handleCreatePhotoUpdate ({ 
        userId,
        productId, 
        category, 
        dateInput, 
        information,
        picture
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const requiredFields = {
                productId, 
                category, 
                dateInput, 
                information,
                picture
            };

            const formatFieldName = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            for (const [key, value] of Object.entries(requiredFields)) {
                if (!value) {
                    return {
                        status: false,
                        status_code: 400,
                        message: `${formatFieldName(key)} is required!`,
                        data: {
                            procurement: null,
                        },
                    };
                }
            }
            // ------------------------- End Payload Validation ------------------------- //

            const photoUpdateCreated = await photoUpdateRepository.handleCreatePhotoUpdate({
                userId,
                productId, 
                category, 
                dateInput, 
                information,
                picture
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created data",
                data: {
                    photoUpdate: photoUpdateCreated
                },
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    photoUpdate: null
                },
            }
        }
    };

    /* ------------------- End Handle Create Photo Update  ------------------- */


    /* ------------------- Handle Get Photo Update  ------------------- */

    static async handleGetPhotoUpdate({ category, productId }) {
        try {
            const getPhotoUpdate = await photoUpdateRepository.handleGetPhotoUpdate({ category, productId });
    
            return {
                status: true,
                status_code: 200,
                message: "Successfully displayed photo update",
                data: {
                    photoUpdate: getPhotoUpdate
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    photoUpdate: null
                },
            }
        }
    };

    /* ------------------- End Handle Get Photo Update  ------------------- */


    /* ------------------- Handle Get Photo Update By Id  ------------------- */

    static async handleGetPhotoUpdateById({ id }) {
        try {
            const getPhotoUpdate = await photoUpdateRepository.handleGetPhotoUpdateById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    photoUpdate: getPhotoUpdate,
                },
            };

        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    photoUpdate: null,
                },
            };
        }
    };

    /* ------------------- End Handle Get Photo Update By Id  ------------------- */


    /* ------------------- Handle Update Photo Update By Id ------------------- */

    static async handleUpdatePhotoUpdateById ({ 
        id,
        productId, 
        category, 
        dateInput, 
        information,
        picture
    }) {
        try {
            const getPhotoUpdate = await photoUpdateRepository.handleGetPhotoUpdateById({ id });

            if (getPhotoUpdate.id == id) {
                if (!productId) productId = getPhotoUpdate.productId
                if (!category) category = getPhotoUpdate.category
                if (!dateInput) dateInput = getPhotoUpdate.dateInput
                if (!information) information = getPhotoUpdate.information
                if (!picture) {
                    picture = getPhotoUpdate.picture;
                } else {
                    fileRemove(getPhotoUpdate.picture)
                }
            }

            const updatedPhoto = await photoUpdateRepository.handleUpdatePhotoUpdateById({
                id,
                productId, 
                category, 
                dateInput, 
                information,
                picture
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully updated data",
                data: {
                    photoUpdate: updatedPhoto
                },
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    photoUpdate: null
                },
            }
        }
    };

    /* ------------------- End Handle Update Photo Update By Id ------------------- */


    /* ------------------- Handle Delete Photo Update By Id ------------------- */

    static async handleDeletePhotoUpdateById({ id }) {
        try {
            const getPhotoUpdate = await photoUpdateRepository.handleGetPhotoUpdateById({ id });

            const deletedPhotoUpdate = await photoUpdateRepository.handleDeletePhotoUpdateById({ id });

            fileRemove(getPhotoUpdate.picture);

            return {
                status: true,
                status_code: 201,
                message: "Data deleted successfully",
                data: {
                    photoUpdate: deletedPhotoUpdate
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    photoUpdate: null,
                },
            };
        }
    };

    /* ------------------- End Handle Delete Photo Update By Id ------------------- */
    
};

module.exports = PhotoUpdateService;