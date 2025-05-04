const productionRepository = require("../repositories/productionRepository");
const fileRemove = require("../libs/utils/fileRemove");

class ProductionService {

    /* ------------------- Handle Create Production  ------------------- */

    static async handleCreateProduction ({
        userId,
        productId,
        partName,
        drawingNumber,
        picProduction,
        remark,
        category,
        prodFile
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const requiredFields = {
                productId,
                partName,
                drawingNumber,
                picProduction,
                category,
                remark
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
                drawingNumber,
                picProduction,
                remark,
                category,
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


    /* ------------------- Handle Update Production By Id  ------------------- */

    static async handleUpdateProductionById ({ 
        id,
        productId, 
        partName,
        drawingNumber,
        picProduction,
        remark,
        category,
        prodFile
    }) {
        try {
            const getProductionById = await productionRepository.handleGetProductionById({ id });

            if (getProductionById.id == id) {
                if (!productId) productId = getProductionById.productId
                if (!partName) partName = getProductionById.partName
                if (!drawingNumber) drawingNumber = getProductionById.drawingNumber
                if (!picProduction) picProduction = getProductionById.picProduction
                if (!remark) remark = getProductionById.remark
                if (!category) category = getProductionById.category
                if (!prodFile) {
                    prodFile = getProductionById.prodFile;
                } else {
                    fileRemove(getProductionById.prodFile)
                }
            }

            const updatedProduction = await productionRepository.handleUpdateProductionById({
                id,
                productId, 
                partName,
                drawingNumber,
                picProduction,
                remark,
                category,
                prodFile
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