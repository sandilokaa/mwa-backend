const partDesignRepository = require("../repositories/partDesignRepository");
const fileRemove = require("../libs/utils/fileRemove");

class PartDesignService {

    /* ------------------- Handle Create Part Design  ------------------- */

    static async handleCreatePartDesign ({
        userId,
        productId,
        name,
        category,
        picture
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const requiredFields = {
                productId,
                name,
            };
            
            const formatFieldName = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            for (const [key, value] of Object.entries(requiredFields)) {
                if (!value) {
                    return {
                        status: false,
                        status_code: 400,
                        message: `${formatFieldName(key)} is required!`,
                        data: {
                            partDesign: null,
                        },
                    };
                }
            }
            // ------------------------- End Payload Validation ------------------------- //

            const partDesignCreated = await partDesignRepository.handleCreatePartDesign({
                userId,
                productId,
                name,
                category,
                picture
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created data",
                data: {
                    partDesign: partDesignCreated
                },
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    partDesign: null
                },
            }
        }
    };

    /* ------------------- End Handle Create Part Design  ------------------- */


    /* ------------------- Handle Get Part Design  ------------------- */

    static async handleGetPartDesign({ productId, page, limit, category }) {
        try {
            const getPartDesign = await partDesignRepository.handleGetPartDesign({ productId, page, limit, category });

            return {
                status: true,
                status_code: 200,
                message: "Successfully displayed part design",
                data: {
                    partDesign: getPartDesign
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    partDesign: null
                },
            }
        }
    };

    /* ------------------- End Handle Get Part Design  ------------------- */


    /* ------------------- Handle Get Part Design By Id  ------------------- */

    static async handleGetPartDesignById({ id }) {
        try {
            const getPartDesignById = await partDesignRepository.handleGetPartDesignById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    partDesign: getPartDesignById,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    partDesign: null,
                },
            };
        }
    };

    /* ------------------- End Handle Get Part Design By Id  ------------------- */


    /* ------------------- Handle Delete Part Design By Id ------------------- */

    static async handleDeletePartDesignById({ id }) {
        try {

            const getPartDesignById = await partDesignRepository.handleGetPartDesignById({ id });

            const deletedPartDesign = await partDesignRepository.handleDeletePartDesignById({ id });

            fileRemove(getPartDesignById.picture);

            return {
                status: true,
                status_code: 201,
                message: "Data deleted successfully",
                data: {
                    partDesign: deletedPartDesign
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    partDesign: null
                },
            };
        }
    };

    /* ------------------- End Handle Delete Part Design By Id ------------------- */


    /* ------------------- Handle Update Part Design By Id  ------------------- */

    static async handleUpdatePartDesignById ({ 
        id,
        productId,
        name,
        category,
        picture
    }) {
        try {
            const getPartDesignById = await partDesignRepository.handleGetPartDesignById({ id });

            if (getPartDesignById.id == id) {
                if (!productId) productId = getPartDesignById.productId
                if (!name) name = getPartDesignById.partName
                if (!category) category = getPartDesignById.category
                if (!picture) {
                    picture = getPartDesignById.picture;
                } else {
                    fileRemove(getPartDesignById.picture)
                }
            }

            const updatedPartDesign = await partDesignRepository.handleUpdatePartDesignById({
                id,
                productId,
                name,
                category,
                picture
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully updated data",
                data: {
                    partDesign: updatedPartDesign
                },
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    partDesign: null
                },
            }
        }
    };


    /* ------------------- End Handle Update Part Design By Id  ------------------- */

};

module.exports = PartDesignService;