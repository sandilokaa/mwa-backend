const engineeringRepository = require("../repositories/engineeringRepository");
const productionRepository = require("../repositories/productionRepository");

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
        prodFile,
        engineFile
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
                engineFile
            });

            const productionCreated = await productionRepository.handleCreateProduction({
                userId: engineeringCreated.userId,
                productId: engineeringCreated.productId,
                engineeringId: engineeringCreated.id,
                partName: engineeringCreated.partName,
                drawingNumber: engineeringCreated.drawingNumber,
                remark: engineeringCreated.remark,
                category: engineeringCreated.category,
                prodFile: engineeringCreated.engineFile
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
                    production: null,
                },
            }
        }
    };

    /* ------------------- End Handle Create Engineering  ------------------- */

};

module.exports = EngineeringService;