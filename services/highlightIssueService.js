const highlightIssueRepository = require("../repositories/highlightIssueRepository");

class HighlightIssueService {

    /* ------------------- Handle Create Highlight Issue  ------------------- */

    static async handleCreateHighlightIssue({
        userId,
        productId,
        itemName,
        category,
        pic,
        issue,
        countermeassure,
        dueDate
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const requiredFields = {
                productId,
                itemName,
                category,
                pic,
                issue,
                countermeassure,
                dueDate
            };
            
            const formatFieldName = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            for (const [key, value] of Object.entries(requiredFields)) {
                if (!value) {
                    return {
                        status: false,
                        status_code: 400,
                        message: `${formatFieldName(key)} is required!`,
                        data: {
                            highlightIssue: null,
                        },
                    };
                }
            }
            // ------------------------- End Payload Validation ------------------------- //

            const highlightIssueCreated = await highlightIssueRepository.handleCreateHighlightIssue({
                userId,
                productId,
                itemName,
                category,
                pic,
                issue,
                countermeassure,
                dueDate
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created data",
                data: {
                    highlightIssue: highlightIssueCreated
                },
            }
        } catch (error) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    highlightIssue: null
                },
            }
        }
    };

    /* ------------------- End Handle Create Highlight Issue  ------------------- */


    /* ------------------- Handle Get Highlight Issue  ------------------- */

    static async handleGetHighlightIssue({ productId, itemName, page, limit }) {
        try {
            const getHighlightIssue = await highlightIssueRepository.handleGetHighlightIssue({ productId, itemName, page, limit });

            return {
                status: true,
                status_code: 200,
                message: "Successfully displayed highlight issue",
                data: {
                    highlightIssue: getHighlightIssue
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    highlightIssue: null
                },
            }
        }
    };

    /* ------------------- End Handle Get Highlight Issue  ------------------- */


    /* ------------------- Handle Get Highlight Issue By Id  ------------------- */

    static async handleGetHighlightIssueById({ id }) {
        try {
            const getHighlightIssue = await highlightIssueRepository.handleGetHighlightIssueById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    highlightIssue: getHighlightIssue,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    highlightIssue: null,
                },
            };
        }
    };

    /* ------------------- End Handle Get Highlight Issue By Id  ------------------- */


    /* ------------------- Handle Get Metric Highlight Issue  ------------------- */

    static async handleGetMetricHighlightIssue({ productId }) {
        try {
            const getMetrics = await highlightIssueRepository.handleGetMetricHighlightIssue({ productId });
        
            return {
                status: true,
                status_code: 200,
                message: 'Summary fetched successfully',
                data: {
                    highlightIssue: getMetrics,
                }
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    highlightIssue: null,
                }
            };
        }
    };

    /* ------------------- End Handle Get Metric Highlight Issue  ------------------- */


    /* ------------------- Handle Delete Highlight Issue By Id  ------------------- */

    static async handleDeleteHighlightIssue({ id }) {
        try {
            const deletedIssue = await highlightIssueRepository.handleDeleteHighlightIssue({ id });

            return {
                status: true,
                status_code: 201,
                message: "Data deleted successfully",
                data: {
                    highlightIssue: deletedIssue
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    highlightIssue: null,
                },
            };
        }
    };

    /* ------------------- End Handle Delete Highlight Issue By Id  ------------------- */


    /* ------------------- Handle Get Notification  ------------------- */

    static async handleGetNotification({ productId, daysBefore, page, limit }) {
        try {
            const getNotification = await highlightIssueRepository.handleGetNotification({ productId, daysBefore, page, limit });
        
            return {
                status: true,
                status_code: 200,
                message: 'Notification fetched successfully',
                data: {
                    highlightIssue: getNotification,
                }
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    highlightIssue: null,
                }
            };
        }
    };

    /* ------------------- End Handle Get Notification  ------------------- */


    /* ------------------- Handle Update Highlight Issue  ------------------- */

    static async handleUpdateHighlightIssue({ 
        id, 
        productId,
        itemName,
        category,
        pic,
        issue,
        countermeassure,
        dueDate
    }) {
        try {

            const getHighlightIssue = await highlightIssueRepository.handleGetHighlightIssueById({ id });

            if (getHighlightIssue.id == id) {
                if (!productId) productId = getHighlightIssue.productId;
                if (!itemName) itemName = getHighlightIssue.itemName;
                if (!category) category = getHighlightIssue.category;
                if (!pic) pic = getHighlightIssue.pic;
                if (!countermeassure) countermeassure = getHighlightIssue.countermeassure;
                if (!issue) issue = getHighlightIssue.issue;
                if (!dueDate) dueDate = getHighlightIssue.dueDate;
            }

            const updatedIssue = await highlightIssueRepository.handleUpdateHighlightIssue({ 
                id, 
                productId,
                itemName,
                category,
                pic,
                issue,
                countermeassure,
                dueDate
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    highlightIssue: updatedIssue
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    highlightIssue: null,
                },
            };
        }
    };

    /* ------------------- End Handle Update Highlight Issue  ------------------- */


    /* ------------------- Handle Update Status Highlight Issue  ------------------- */

    static async handleUpdateStatusHighlightIssue({ 
        id,
        statusIssue
    }) {
        try {

            const getHighlightIssue = await highlightIssueRepository.handleGetHighlightIssueById({ id });

            if (getHighlightIssue.id == id) {
                if (!statusIssue) statusIssue = getHighlightIssue.statusIssue;
            }

            const updatedIssue = await highlightIssueRepository.handleUpdateStatusHighlightIssue({ 
                id,
                statusIssue
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    highlightIssue: updatedIssue
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    highlightIssue: null,
                },
            };
        }
    };

    /* ------------------- End Handle Update Status Highlight Issue  ------------------- */


    /* ------------------- Handle Update Status Highlight Issue  ------------------- */

    static async updateOverdueHighlightIssue() {
        try {
            return highlightIssueRepository.updateOverdueHighlightIssue();
        } catch (error) {
            console.log(error.message);
        }
    }

    /* ------------------- End Handle Update Status Highlight Issue  ------------------- */


    /* ------------------- Handle Get Summary Highlight Issue  ------------------- */

    static async handleGetSummaryHighlightIssue({ productId }) {
        try {
            const getSummary = await highlightIssueRepository.handleGetSummaryHighlightIssue({ productId });
        
            return {
                status: true,
                status_code: 200,
                message: 'Summary fetched successfully',
                data: {
                    highlightIssue: getSummary,
                }
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    highlightIssue: null,
                }
            };
        }
    };

    /* ------------------- End Handle Get Summary Highlight Issue  ------------------- */

};

module.exports = HighlightIssueService;