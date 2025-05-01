const productionRepository = require("../repositories/productionRepository");
const fileRemove = require("../libs/utils/fileRemove");

class ProductionService {

    /* ------------------- Handle Create Production  ------------------- */

    static async handleCreateProduction ({
        userId,
        productId,
        partName,
        partNumber,
        drawingNumber,
        picProduction,
        information,
        prodFile
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const requiredFields = {
                productId,
                partName,
                partNumber,
                drawingNumber,
                picProduction,
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
                            production: null,
                        },
                    };
                }
            }
            // ------------------------- End Payload Validation ------------------------- //

            const productionCreated = await productionRepository.handleCreateProduction({
                userId,
                productId,
                partName,
                partNumber,
                drawingNumber,
                picProduction,
                information,
                prodFile
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created data",
                data: {
                    production: productionCreated
                },
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    production: null
                },
            }
        }
    };

    /* ------------------- End Handle Create Production  ------------------- */


    /* ------------------- Handle Get Production  ------------------- */

    static async handleGetProduction({ productId, partNumber, page, limit }) {
        try {
            const getProduction = await productionRepository.handleGetProduction({ productId, partNumber, page, limit });

            return {
                status: true,
                status_code: 200,
                message: "Successfully displayed production",
                data: {
                    production: getProduction
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    production: null
                },
            }
        }
    };

    /* ------------------- End Handle Get Production  ------------------- */


    /* ------------------- Handle Get Production By Id  ------------------- */

    static async handleGetProductionById({ id }) {
        try {
            const getProductionById = await productionRepository.handleGetProductionById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    production: getProductionById,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    production: null,
                },
            };
        }
    };

    /* ------------------- End Handle Get Production By Id  ------------------- */


    /* ------------------- Handle Delete Production By Id ------------------- */

    static async handleDeleteProductionById({ id }) {
        try {
            const getProduction = await productionRepository.handleGetProductionById({ id });

            const deletedProduction = await productionRepository.handleDeleteProductionById({ id });

            fileRemove(getProduction.prodFile);

            return {
                status: true,
                status_code: 201,
                message: "Data deleted successfully",
                data: {
                    production: deletedProduction
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    production: null,
                },
            };
        }
    };

    /* ------------------- End Handle Delete Production By Id ------------------- */

};

module.exports = ProductionService;