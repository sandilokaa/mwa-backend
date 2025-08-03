const budgetStatusLimitService = require("../../../services/project/budgetStatus/budgetStatusLimitService");

/* ------------------- Handle Create Budget Status Limit ------------------- */

const handleCreateBudgetStatusLimit = async(req, res) => {
    const userId = req.admin.id;

    const { 
        productId,
        system,
        limit,
        month,
        year
    } = req.body;

    const { status, status_code, message, data} = await budgetStatusLimitService.handleCreateBudgetStatusLimit({
        userId,
        productId,
        system,
        limit,
        month,
        year
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Create Budget Status Limit ------------------- */


/* ------------------- Handle Get Budget Status Limit ------------------- */

const handleGetAllBudgetStatusLimit = async(req, res) => {

    const { productId, system, month, year, page = 1, limit = 5 } = req.query;

    const { status, status_code, message, data} = await budgetStatusLimitService.handleGetAllBudgetStatusLimit({ 
        productId,
        system,
        month,
        year,
        page: parseInt(page),
        limit: parseInt(limit)
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Budget Status Limit ------------------- */


/* ------------------- Handle Update Budget Status Limit  ------------------- */

const handleUpdateBudgetStatusLimit = async(req, res) => {
    const { id } = req.params;

    const {  
        productId,
        system,
        limit,
        month,
        year
    } = req.body;

    const { status, status_code, message, data} = await budgetStatusLimitService.handleUpdateBudgetStatusLimit({ 
        id, 
        productId,
        system,
        limit,
        month,
        year
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Status Limit Status  ------------------- */


/* ------------------- Handle Delete Budget Status Limit By Id  ------------------- */

const handleDeleteBudgetStatusLimit = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await budgetStatusLimitService.handleDeleteBudgetStatusLimit({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Delete Budget Status Limit By Id  ------------------- */


/* ------------------- Handle Get Budget Status Limit By Id  ------------------- */

const handleGetBudgetStatusLimitById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await budgetStatusLimitService.handleGetBudgetStatusLimitById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Budget Status Limit By Id  ------------------- */

module.exports = {
    handleCreateBudgetStatusLimit,
    handleGetAllBudgetStatusLimit,
    handleUpdateBudgetStatusLimit,
    handleDeleteBudgetStatusLimit,
    handleGetBudgetStatusLimitById
};