const procurementService = require("../services/procurementService");

/* ------------------- Handle Create Procurement  ------------------- */

const handleCreateProcurement = async(req, res) => {
    const userId = req.admin.id;

    const { 
        productId,  
        itemName,
        submissionDate,
        etaTarget,
        prNumber,
        poNumber,
        quantity,
        vendor
    } = req.body;

    const { status, status_code, message, data} = await procurementService.handleCreateProcurement({
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

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Create Procurement  ------------------- */


/* ------------------- Handle Get Procurement  ------------------- */

const handleGetProcurement = async(req, res) => {

    const { itemName, productId, prNumber } = req.query;

    const { status, status_code, message, data} = await procurementService.handleGetProcurement({ itemName, productId, prNumber });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Procurement  ------------------- */


/* ------------------- Handle Get Procurement By Id  ------------------- */

const handleGetProcurementById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await procurementService.handleGetProcurementById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Procurement By Id  ------------------- */


/* ------------------- Handle Get Notification  ------------------- */

const handleGetNotification = async(req, res) => {
    const { productId } = req.query;

    const { status, status_code, message, data} = await procurementService.handleGetNotification({
        daysBefore: 3,
        productId
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Notification  ------------------- */


module.exports = { 
    handleCreateProcurement,
    handleGetProcurement,
    handleGetProcurementById,
    handleGetNotification
};