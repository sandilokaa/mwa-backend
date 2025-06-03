const procurementRepository = require("../../../repositories/project/developmentStatus/procurementRepository");

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

    static async handleGetProcurement({ productId, prNumber, page, limit }) {
        try {
            const getProcurement = await procurementRepository.handleGetProcurement({ productId, prNumber, page, limit });

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

    static async handleGetNotification({ daysBefore, productId, page, limit }) {
        try {
            const getNotification = await procurementRepository.handleGetNotification({ daysBefore, productId, page, limit });
        
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


    /* ------------------- Handle Delete Procurement By Id  ------------------- */

    static async handleDeleteProcurementById({ id }) {
        try {
            const deletedProcurement = await procurementRepository.handleDeleteProcurementById({ id });

            return {
                status: true,
                status_code: 201,
                message: "Data deleted successfully",
                data: {
                    procurement: deletedProcurement
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

    /* ------------------- End Handle Delete Procurement By Id  ------------------- */


    /* ------------------- Handle Get Summary Procurement  ------------------- */

    static async handleGetSummaryProcurement({ productId }) {
        try {
            const getSummary = await procurementRepository.handleGetSummaryProcurement({ productId });
        
            return {
                status: true,
                status_code: 200,
                message: 'Summary fetched successfully',
                data: {
                    procurement: getSummary,
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

    /* ------------------- End Handle Get Summary Procurement  ------------------- */


    /* ------------------- Handle Get Metric Procurement  ------------------- */

    static async handleGetMetricProcurement({ productId }) {
        try {
            const getMetrics = await procurementRepository.handleGetMetricProcurement({ productId });
        
            return {
                status: true,
                status_code: 200,
                message: 'Summary fetched successfully',
                data: {
                    procurement: getMetrics,
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

    /* ------------------- End Handle Get Metric Procurement  ------------------- */


    /* ------------------- Handle Update Procurement  ------------------- */

    static async handleUpdateProcurement({ 
        id,
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

            const getProcurementById = await procurementRepository.handleGetProcurementById({ id });

            if (getProcurementById.id == id) {
                if (!productId) productId = getProcurementById.productId;
                if (!itemName) itemName = getProcurementById.itemName;
                if (!submissionDate) submissionDate = getProcurementById.submissionDate;
                if (!etaTarget) etaTarget = getProcurementById.etaTarget;
                if (!prNumber) prNumber = getProcurementById.prNumber;
                if (!poNumber) poNumber = getProcurementById.poNumber;
                if (!quantity) quantity = getProcurementById.quantity;
                if (!vendor) vendor = getProcurementById.vendor;
            }

            const updatedProcurement = await procurementRepository.handleUpdateProcurement({ 
                id,
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
                message: "Data updated successfully",
                data: {
                    procurement: updatedProcurement
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

    /* ------------------- End Handle Update Procurement  ------------------- */


    /* ------------------- Handle Update Status Procurement  ------------------- */

    static async updateOverdueProcurements() {
        try {
            return procurementRepository.updateOverdueProcurements();
        } catch (error) {
            console.log(error.message);
        }
    }

    /* ------------------- End Handle Update Status Procurement  ------------------- */


    /* ------------------- Handle Update Progress Procurement  ------------------- */

    static async handleUpdateProgressProcurement({ 
        id,
        progress
    }) {
        try {

            const getProcurementById = await procurementRepository.handleGetProcurementById({ id });

            if (getProcurementById.id == id) {
                if (!progress) progress = getProcurementById.progress;
            }

            let statusProc = getProcurementById.statusProc;
            if (progress === "delivered") {
                statusProc = "done"
            } else if (statusProc !== "overdue") {
                statusProc = "on progress"
            }

            const updatedProcurement = await procurementRepository.handleUpdateProgressProcurement({ 
                id,
                progress,
                statusProc
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    procurement: updatedProcurement
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

    /* ------------------- End Handle Update Progress Procurement  ------------------- */

};

module.exports = ProcurementService;