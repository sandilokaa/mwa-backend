const budgetStatusLimitRepository = require("../../../repositories/project/budgetStatus/budgetStatusLimitRepository");

class BudgetStatusLimitService {

    /* ------------------- Handle Create Budget Status Limit ------------------- */

    static async handleCreateBudgetStatusLimit({
        userId,
        productId,
        system,
        limit,
        month,
        year
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const requiredFields = {
                productId,
                productId,
                system,
                limit,
                month,
                year
            };
            
            const formatFieldName = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            for (const [key, value] of Object.entries(requiredFields)) {
                if (!value) {
                    return {
                        status: false,
                        status_code: 400,
                        message: `${formatFieldName(key)} is required!`,
                        data: {
                            budgetStatusLimit: null,
                        },
                    };
                }
            }
            // ------------------------- End Payload Validation ------------------------- //

            const budgetStatusLimitCreated = await budgetStatusLimitRepository.handleCreateBudgetStatusLimit({
                userId,
                productId,
                system,
                limit,
                month,
                year
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created data",
                data: {
                    budgetStatusLimit: budgetStatusLimitCreated
                },
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    budgetStatusLimit: null
                },
            }
        }
    };

    /* ------------------- End Handle Create Budget Status Limit ------------------- */


    /* ------------------- Handle Get Budget Status Limit ------------------- */

    static async handleGetAllBudgetStatusLimit({ productId, system, page, month, year, limit }) {
        try {
            const getBudgetStatusLimit = await budgetStatusLimitRepository.handleGetAllBudgetStatusLimit({ productId, system, month, year, page, limit });

            return {
                status: true,
                status_code: 200,
                message: "Successfully displayed budget status limit",
                data: {
                    budgetStatusLimit: getBudgetStatusLimit
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    budgetStatusLimit: null
                },
            }
        }
    };

    /* ------------------- End Handle Get Budget Status Limit ------------------- */


    /* ------------------- Handle Update Budget Status Limit  ------------------- */

    static async handleUpdateBudgetStatusLimit({ 
        id, 
        productId,
        system,
        limit,
        month,
        year
    }) {
        try {

            const getBudgetStatusLimit = await budgetStatusLimitRepository.handleGetBudgetStatusLimitById({ id });

            if (getBudgetStatusLimit.id == id) {
                if (!productId) productId = getBudgetStatusLimit.productId;
                if (!system) system = getBudgetStatusLimit.system;
                if (!limit) limit = getBudgetStatusLimit.limit;
                if (!month) month = getBudgetStatusLimit.month;
                if (!year) year = getBudgetStatusLimit.year;
            }

            const updatedBudgetStatusLimit = await budgetStatusLimitRepository.handleUpdateBudgetStatusLimit({ 
                id, 
                productId,
                system,
                limit,
                month,
                year
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    budgetStatusLimit: updatedBudgetStatusLimit
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    budgetStatusLimit: null,
                },
            };
        }
    };

    /* ------------------- End Handle Update Budget Status Limit  ------------------- */


    /* ------------------- Handle Delete Budget Status Limit By Id  ------------------- */

    static async handleDeleteBudgetStatusLimit({ id }) {
        try {
            const deletedBudgetStatusLimit = await budgetStatusLimitRepository.handleDeleteBudgetStatusLimit({ id });

            return {
                status: true,
                status_code: 201,
                message: "Data deleted successfully",
                data: {
                    budgetStatusLimit: deletedBudgetStatusLimit
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    budgetStatusLimit: null,
                },
            };
        }
    };

    /* ------------------- End Handle Delete Budget Status Limit By Id  ------------------- */


    /* ------------------- Handle Get Budget Status Limit By Id  ------------------- */

    static async handleGetBudgetStatusLimitById({ id }) {
        try {
            const getBudgetStatusLimit = await budgetStatusLimitRepository.handleGetBudgetStatusLimitById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    budgetStatusLimit: getBudgetStatusLimit,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    budgetStatusLimit: null,
                },
            };
        }
    };

    /* ------------------- End Handle Get Budget Status Limit By Id  ------------------- */

};

module.exports = BudgetStatusLimitService;