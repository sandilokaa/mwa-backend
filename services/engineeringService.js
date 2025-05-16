const engineeringRepository = require("../repositories/engineeringRepository");
const productionRepository = require("../repositories/productionRepository");
const fileRemove = require("../libs/utils/fileRemove")

class EngineeringService {

    /* ------------------- Handle Create Engineering  ------------------- */

    static async handleCreateEngineering ({
        userId,
        productId,
        engineeringId,
        partName,
        drawingNumber,
        category,
        pic3D,
        pic2DDXF,
        startDate,
        dateRequired,
        price,
        quantity,
        totalPrice,
        remark,
        picture
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const requiredFields = {
                productId,
                partName,
                drawingNumber,
                category,
                pic3D,
                pic2DDXF,
                startDate,
                dateRequired,
                price,
                quantity,
                remark,
            };
            
            const formatFieldName = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            for (const [key, value] of Object.entries(requiredFields)) {
                if (!value) {
                    return {
                        status: false,
                        status_code: 400,
                        message: `${formatFieldName(key)} is required!`,
                        data: {
                            engineering: null,
                        },
                    };
                }
            }
            // ------------------------- End Payload Validation ------------------------- //

            const engineeringCreated = await engineeringRepository.handleCreateEngineering({
                userId,
                productId,
                partName,
                drawingNumber,
                category,
                pic3D,
                pic2DDXF,
                startDate,
                dateRequired,
                price,
                quantity,
                totalPrice: price * quantity,
                remark,
                picture
            });

            const productionCreated = await productionRepository.handleCreateProduction({
                userId: engineeringCreated.userId,
                productId: engineeringCreated.productId,
                engineeringId: engineeringCreated.id,
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created data",
                data: {
                    engineering: engineeringCreated,
                    production: productionCreated
                },
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    engineering: null,
                    production: null
                },
            }
        }
    };

    /* ------------------- End Handle Create Engineering  ------------------- */


    /* ------------------- Handle Get Engineering  ------------------- */

    static async handleGetEngineering({ productId, partName, page, limit, category }) {
        try {
            const getEngineering = await engineeringRepository.handleGetEngineering({ productId, partName, page, limit, category });

            return {
                status: true,
                status_code: 200,
                message: "Successfully displayed engineering",
                data: {
                    engineering: getEngineering
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    engineering: null
                },
            }
        }
    };

    /* ------------------- End Handle Get Engineering  ------------------- */


    /* ------------------- Handle Get Engineering By Id  ------------------- */

    static async handleGetEngineeringById({ id }) {
        try {
            const getEngineeringById = await engineeringRepository.handleGetEngineeringById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    engineering: getEngineeringById,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    engineering: null,
                },
            };
        }
    };

    /* ------------------- End Handle Get Engineering By Id  ------------------- */


    /* ------------------- Handle Delete Engineering By Id ------------------- */

    static async handleDeleteEngineeringById({ id }) {
        try {

            const getEngineeringById = await engineeringRepository.handleGetEngineeringById({ id });

            const deletedEngineering = await engineeringRepository.handleDeleteEngineeringById({ id });
            const deletedProduction = await productionRepository.handleDeleteProductionByEngineeringId({ engineeringId: getEngineeringById.id });

            fileRemove(getEngineeringById.picture);

            return {
                status: true,
                status_code: 201,
                message: "Data deleted successfully",
                data: {
                    engineering: deletedEngineering,
                    production: deletedProduction
                },
            };
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    engineering: null,
                    production: null
                },
            };
        }
    };

    /* ------------------- End Handle Delete Engineering By Id ------------------- */


    /* ------------------- Handle Get Summary Status Engineering  ------------------- */

    static async handleGetSummaryStatusEngineering({ productId, category }) {
        try {
            const getSummary = await engineeringRepository.handleGetSummaryStatusEngineering({ productId, category });
        
            return {
                status: true,
                status_code: 200,
                message: 'Summary fetched successfully',
                data: {
                    engineering: getSummary,
                }
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    engineering: null,
                }
            };
        }
    };

    /* ------------------- End Handle Get Summary Status Engineering  ------------------- */


    /* ------------------- Handle Update Engineering By Id  ------------------- */

    static async handleUpdateEngineeringById ({ 
        id,
        productId,
        partName,
        drawingNumber,
        category,
        pic3D,
        pic2DDXF,
        startDate,
        dateRequired,
        price,
        quantity,
        totalPrice,
        remark,
        picture
    }) {
        try {
            const getEngineeringById = await engineeringRepository.handleGetEngineeringById({ id });

            if (getEngineeringById.id == id) {
                if (!productId) productId = getEngineeringById.productId
                if (!partName) partName = getEngineeringById.partName
                if (!drawingNumber) drawingNumber = getEngineeringById.drawingNumber
                if (!category) category = getEngineeringById.category
                if (!remark) remark = getEngineeringById.remark
                if (!pic3D) pic3D = getEngineeringById.pic3D
                if (!pic2DDXF) pic2DDXF = getEngineeringById.pic2DDXF
                if (!startDate) startDate = getEngineeringById.startDate
                if (!dateRequired) dateRequired = getEngineeringById.dateRequired
                if (!price) price = getEngineeringById.price
                if (!quantity) quantity = getEngineeringById.quantity
                if (!totalPrice) totalPrice = getEngineeringById.totalPrice
                if (!picture) {
                    picture = getEngineeringById.picture;
                } else {
                    fileRemove(getEngineeringById.picture)
                }
            }

            const updatedEngineering = await engineeringRepository.handleUpdateEngineeringById({
                id,
                productId,
                partName,
                drawingNumber,
                category,
                pic3D,
                pic2DDXF,
                startDate,
                dateRequired,
                price,
                quantity,
                totalPrice,
                remark,
                picture
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully updated data",
                data: {
                    engineering: updatedEngineering
                },
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    engineering: null
                },
            }
        }
    };

    /* ------------------- End Handle Update Engineering By Id  ------------------- */


    /* ------------------- Handle Update Status Engineering  ------------------- */

    static async handleUpdateStatusEngineering({ 
        id,
        status3D, 
        status2D, 
        statusDXF
    }) {
        try {

            const getEngineering = await engineeringRepository.handleGetEngineeringById({ id });

            if (getEngineering.id == id) {
                if (!status3D) status3D = getEngineering.status3D;
                if (!status2D) status2D = getEngineering.status2D;
                if (!statusDXF) statusDXF = getEngineering.statusDXF;
            }

            const updatedEngineeringStatus = await engineeringRepository.handleUpdateStatusEngineering({ 
                id,
                status3D, 
                status2D, 
                statusDXF
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    engineering: updatedEngineeringStatus
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    engineering: null,
                },
            };
        }
    };

    /* ------------------- End Handle Update Status Engineering  ------------------- */

};

module.exports = EngineeringService;