const procurementRepository = require("../repositories/procurementRepository");

class ProcurementService {

    /* ------------------- Handle Create Procurement  ------------------- */

    static async handleCreateProcurement ({
        userId,
        productId,  
        itemName,
        submissionDate,
        etaTarget,
        prNumber,
        poNumber,
        quantity,
        vendor
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const requiredFields = {
                productId,
                itemName,
                submissionDate,
                etaTarget,
                prNumber,
                poNumber,
                quantity,
                vendor
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

            const procurementCreated = await procurementRepository.handleCreateProcurement({
                userId,
                productId,  
                itemName,
                submissionDate,
                etaTarget,
                prNumber,
                poNumber,
                quantity,
                vendor
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created data",
                data: {
                    procurement: procurementCreated
                },
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    procurement: null
                },
            }
        }
    };

    /* ------------------- End Handle Create Procurement  ------------------- */


    /* ------------------- Handle Get Procurement  ------------------- */

    static async handleGetProcurement({ itemName, productId, prNumber }) {
        try {
            const getProcurement = await procurementRepository.handleGetProcurement({ itemName, productId, prNumber });

            return {
                status: true,
                status_code: 200,
                message: "Successfully displayed procurement",
                data: {
                    procurement: getProcurement
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    procurement: null
                },
            }
        }
    };

    /* ------------------- End Handle Get Procurement  ------------------- */


    /* ------------------- Handle Get Procurement By Id  ------------------- */

    static async handleGetProcurementById({ id }) {
        try {
            const getProcurementById = await procurementRepository.handleGetProcurementById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    procurement: getProcurementById,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    procurement: null,
                },
            };
        }
    };

    /* ------------------- End Handle Get Procurement By Id  ------------------- */


    /* ------------------- Handle Get Notification  ------------------- */

    static async handleGetNotification({ daysBefore, productId }) {
        try {
            const getNotification = await procurementRepository.handleGetNotification({ daysBefore, productId });
        
            return {
                status: true,
                status_code: 200,
                message: 'Notification fetched successfully',
                data: {
                    procurement: getNotification,
                }
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    procurement: null,
                }
            };
        }
    };

    /* ------------------- End Handle Get Notification  ------------------- */

};

module.exports = ProcurementService;