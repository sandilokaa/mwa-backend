const productionRepository = require("../repositories/productionRepository");

class ProductionService {

    /* ------------------- Handle Get Production  ------------------- */

    static async handleGetProduction({ productId, partName, page, limit, category }) {
        try {
            const getProduction = await productionRepository.handleGetProduction({ productId, partName, page, limit, category });

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


    /* ------------------- Handle Update Production By Id  ------------------- */

    static async handleUpdateProductionById ({ 
        id,
        picProduction,
    }) {
        try {
            const getProductionById = await productionRepository.handleGetProductionById({ id });

            if (getProductionById.id == id) {
                if (!picProduction) picProduction = getProductionById.picProduction
            }

            const updatedProduction = await productionRepository.handleUpdateProductionById({
                id,
                picProduction,
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully updated data",
                data: {
                    production: updatedProduction
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

    /* ------------------- End Handle Update Production By Id  ------------------- */


    /* ------------------- Handle Update Status Production  ------------------- */

    static async handleUpdateStatusProduction({ 
        id,
        productionStatus
    }) {
        try {

            const getProduction = await productionRepository.handleGetProductionById({ id });

            if (getProduction.id == id) {
                if (!productionStatus) productionStatus = getProduction.productionStatus;
            }

            const updatedProductionStatus = await productionRepository.handleUpdateStatusProduction({ 
                id,
                productionStatus
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    production: updatedProductionStatus
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

    /* ------------------- End Handle Update Status Production  ------------------- */


    /* ------------------- Handle Get Summary Status Production  ------------------- */

    static async handleGetSummaryStatusProduction({ productId, category }) {
        try {
            const getSummary = await productionRepository.handleGetSummaryStatusProduction({ productId, category });
        
            return {
                status: true,
                status_code: 200,
                message: 'Summary fetched successfully',
                data: {
                    production: getSummary,
                }
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    production: null,
                }
            };
        }
    };

    /* ------------------- End Handle Get Summary Status Production  ------------------- */

};

module.exports = ProductionService;