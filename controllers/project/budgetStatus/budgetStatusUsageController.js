const budgetStatusUsageService = require("../../../services/project/budgetStatus/budgetStatusUsageService");

/* ------------------- Handle Create Budget Status Usage ------------------- */

const handleCreateBudgetStatusUsage = async(req, res) => {
    const userId = req.admin.id;

    const { 
        productId,
        system,
        subSystem,
        component,
        quantity,
        price,
        totalPrice,
        dateInput
    } = req.body;

    const { status, status_code, message, data} = await budgetStatusUsageService.handleCreateBudgetStatusUsage({
        userId,
        productId,
        system,
        subSystem,
        component,
        quantity,
        price,
        totalPrice,
        dateInput
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Create Budget Status Usage ------------------- */


/* ------------------- Handle Get Budget Status Usage ------------------- */

const handleGetAllBudgetStatusUsage = async(req, res) => {

    const { productId, component, page = 1, limit = 5 } = req.query;

    const { status, status_code, message, data} = await budgetStatusUsageService.handleGetAllBudgetStatusUsage({ 
        productId,
        component,
        page: parseInt(page),
        limit: parseInt(limit)
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Budget Status Usage ------------------- */


/* ------------------- Handle Get Budget Status Usage By Id  ------------------- */

const handleGetBudgetStatusUsageById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await budgetStatusUsageService.handleGetBudgetStatusUsageById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Budget Status Usage By Id  ------------------- */


/* ------------------- Handle Delete Budget Status Usage By Id  ------------------- */

const handleDeleteBudgetStatusUsage = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await budgetStatusUsageService.handleDeleteBudgetStatusUsage({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Delete Budget Status Usage By Id  ------------------- */


/* ------------------- Handle Update Budget Status Usage  ------------------- */

const handleUpdateBudgetStatusUsage = async(req, res) => {
    const { id } = req.params;

    const {  
        productId,
        system,
        subSystem,
        component,
        quantity,
        price,
        totalPrice,
        dateInput
    } = req.body;

    const { status, status_code, message, data} = await budgetStatusUsageService.handleUpdateBudgetStatusUsage({ 
        id, 
        productId,
        system,
        subSystem,
        component,
        quantity,
        price,
        totalPrice,
        dateInput
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Status Usage Status  ------------------- */


module.exports = {
    handleCreateBudgetStatusUsage,
    handleGetAllBudgetStatusUsage,
    handleGetBudgetStatusUsageById,
    handleDeleteBudgetStatusUsage,
    handleUpdateBudgetStatusUsage
};