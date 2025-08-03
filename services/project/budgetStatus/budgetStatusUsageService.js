const budgetStatusUsageRepository = require("../../../repositories/project/budgetStatus/budgetStatusUsageRepository");

class BudgetStatusUsageService {

    /* ------------------- Handle Create Budget Status Usage ------------------- */

    static async handleCreateBudgetStatusUsage({
        userId,
        productId,
        system,
        subSystem,
        component,
        quantity,
        price,
        totalPrice,
        dateInput
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const requiredFields = {
                productId,
                system,
                subSystem,
                component,
                quantity,
                price,
                dateInput
            };
            
            const formatFieldName = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            for (const [key, value] of Object.entries(requiredFields)) {
                if (!value) {
                    return {
                        status: false,
                        status_code: 400,
                        message: `${formatFieldName(key)} is required!`,
                        data: {
                            budgetStatusUsage: null,
                        },
                    };
                }
            }
            // ------------------------- End Payload Validation ------------------------- //

            const budgetStatusUsageCreated = await budgetStatusUsageRepository.handleCreateBudgetStatusUsage({
                userId,
                productId,
                system,
                subSystem,
                component,
                quantity,
                price,
                totalPrice: quantity * price,
                dateInput
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created data",
                data: {
                    budgetStatusUsage: budgetStatusUsageCreated
                },
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    budgetStatusUsage: null
                },
            }
        }
    };

    /* ------------------- End Handle Create Budget Status Usage ------------------- */


    /* ------------------- Handle Get Budget Status Usage ------------------- */

    static async handleGetAllBudgetStatusUsage({ productId, component, page, limit }) {
        try {
            const getBudgetStatusUsage = await budgetStatusUsageRepository.handleGetAllBudgetStatusUsage({ productId, component, page, limit });

            return {
                status: true,
                status_code: 200,
                message: "Successfully displayed budget status usage",
                data: {
                    budgetStatusUsage: getBudgetStatusUsage
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    budgetStatusUsage: null
                },
            }
        }
    };

    /* ------------------- End Handle Get Budget Status Usage ------------------- */


    /* ------------------- Handle Get Budget Status Usage By Id  ------------------- */

    static async handleGetBudgetStatusUsageById({ id }) {
        try {
            const getBudgetStatusUsage = await budgetStatusUsageRepository.handleGetBudgetStatusUsageById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    budgetStatusUsage: getBudgetStatusUsage,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    budgetStatusUsage: null,
                },
            };
        }
    };

    /* ------------------- End Handle Get Budget Status Usage By Id  ------------------- */


    /* ------------------- Handle Delete Budget Status Usage By Id  ------------------- */

    static async handleDeleteBudgetStatusUsage({ id }) {
        try {
            const deletedBudgetStatusUsage = await budgetStatusUsageRepository.handleDeleteBudgetStatusUsage({ id });

            return {
                status: true,
                status_code: 201,
                message: "Data deleted successfully",
                data: {
                    budgetStatusUsage: deletedBudgetStatusUsage
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    budgetStatusUsage: null,
                },
            };
        }
    };

    /* ------------------- End Handle Delete Budget Status Usage By Id  ------------------- */


    /* ------------------- Handle Update Budget Status Usage  ------------------- */

    static async handleUpdateBudgetStatusUsage({ 
        id, 
        productId,
        system,
        subSystem,
        component,
        quantity,
        price,
        totalPrice,
        dateInput
    }) {
        try {

            const getBudgetStatusUsage = await budgetStatusUsageRepository.handleGetBudgetStatusUsageById({ id });

            if (getBudgetStatusUsage.id == id) {
                if (!productId) productId = getBudgetStatusUsage.productId;
                if (!system) system = getBudgetStatusUsage.system;
                if (!subSystem) subSystem = getBudgetStatusUsage.subSystem;
                if (!component) component = getBudgetStatusUsage.component;
                if (!quantity) quantity = getBudgetStatusUsage.quantity;
                if (!price) price = getBudgetStatusUsage.price;
                if (!totalPrice) totalPrice = getBudgetStatusUsage.totalPrice;
                if (!dateInput) dateInput = getBudgetStatusUsage.dateInput;
            }

            const updatedBudgetStatusUsage = await budgetStatusUsageRepository.handleUpdateBudgetStatusUsage({ 
                id, 
                productId,
                system,
                subSystem,
                component,
                quantity,
                price,
                totalPrice: quantity * price,
                dateInput
            });

            return {
                status: true,
                status_code: 201,
                message: "Data updated successfully",
                data: {
                    budgetStatusUsage: updatedBudgetStatusUsage
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    budgetStatusUsage: null,
                },
            };
        }
    };

    /* ------------------- End Handle Update Budget Status Usage  ------------------- */

};

module.exports = BudgetStatusUsageService;