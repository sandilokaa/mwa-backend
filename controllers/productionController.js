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
        partNumber,
        drawingNumber,
        picProduction,
        information
    } = req.body;

    const { status, status_code, message, data} = await productionService.handleCreateProduction({
        userId,
        productId,
        partName,
        partNumber,
        drawingNumber,
        picProduction,
        information,
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

    const { productId, partNumber, page = 1, limit = 5 } = req.query;

    const { status, status_code, message, data} = await productionService.handleGetProduction({ 
        productId, 
        partNumber,
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


module.exports = {
    handleCreateProduction,
    handleGetProduction,
    handleGetProductionById,
    handleDeleteProductionById
}