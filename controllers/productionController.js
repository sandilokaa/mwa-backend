const productionService = require("../services/productionService");

/* ------------------- Handle Create Production  ------------------- */

const handleCreateProduction = async(req, res) => {
    const userId = req.admin.id;

    let prodFile = "";

    if (req.file) {
        prodFile = req.file.path;
    }

    const { 
        productId,  
        partName,
        drawingNumber,
        picProduction,
        information,
        category
    } = req.body;

    const { status, status_code, message, data} = await productionService.handleCreateProduction({
        userId,
        productId,
        partName,
        drawingNumber,
        picProduction,
        information,
        category,
        prodFile
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Create Production  ------------------- */


/* ------------------- Handle Get Production  ------------------- */

const handleGetProduction = async(req, res) => {

    const { productId, partName, page = 1, limit = 5, category } = req.query;

    const { status, status_code, message, data} = await productionService.handleGetProduction({ 
        productId, 
        partName,
        category,
        page: parseInt(page),
        limit: parseInt(limit)
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Production  ------------------- */


/* ------------------- Handle Get Production By Id  ------------------- */

const handleGetProductionById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await productionService.handleGetProductionById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Production By Id  ------------------- */


/* ------------------- Handle Delete Production By Id ------------------- */

const handleDeleteProductionById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await productionService.handleDeleteProductionById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Delete Production By Id ------------------- */


/* ------------------- Handle Update Production By Id  ------------------- */

const handleUpdateProductionById = async(req, res) => {
    const { id } = req.params;

    let prodFile = "";

    if (req.file) {
        prodFile = req.file.path;
    }

    const { 
        productId,  
        partName,
        drawingNumber,
        picProduction,
        information,
        category
    } = req.body;

    const { status, status_code, message, data} = await productionService.handleUpdateProductionById({
        id,
        productId, 
        partName,
        drawingNumber,
        picProduction,
        information,
        category,
        prodFile
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Production By Id  ------------------- */


/* ------------------- Handle Update Status Production  ------------------- */

const handleUpdateStatusProduction = async(req, res) => {
    const { id } = req.params;

    const { productionStatus } = req.body;

    const { status, status_code, message, data} = await productionService.handleUpdateStatusProduction({ id, productionStatus });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Status Production  ------------------- */


/* ------------------- Handle Get Summary Status Production  ------------------- */

const handleGetSummaryStatusProduction = async(req, res) => {
    const { productId, category } = req.query;

    const { status, status_code, message, data} = await productionService.handleGetSummaryStatusProduction({
        productId,
        category
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Summary Status Production  ------------------- */


module.exports = {
    handleCreateProduction,
    handleGetProduction,
    handleGetProductionById,
    handleDeleteProductionById,
    handleUpdateProductionById,
    handleUpdateStatusProduction,
    handleGetSummaryStatusProduction
}