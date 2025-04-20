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

    const { productId, prNumber, page = 1, limit = 5 } = req.query;

    const { status, status_code, message, data} = await procurementService.handleGetProcurement({ 
        productId, 
        prNumber,
        page: parseInt(page),
        limit: parseInt(limit)
    });

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
    const { productId, page = 1, limit = 4 } = req.query;

    const { status, status_code, message, data} = await procurementService.handleGetNotification({
        daysBefore: 3,
        productId,
        page: parseInt(page),
        limit: parseInt(limit)
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Notification  ------------------- */


/* ------------------- Handle Delete Procurement By Id  ------------------- */

const handleDeleteProcurementById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await procurementService.handleDeleteProcurementById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Delete Procurement By Id  ------------------- */


/* ------------------- Handle Get Summary Procurement  ------------------- */

const handleGetSummaryProcurement = async(req, res) => {
    const { productId } = req.query;

    const { status, status_code, message, data} = await procurementService.handleGetSummaryProcurement({
        productId
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Summary Procurement  ------------------- */


/* ------------------- Handle Get Metric Procurement  ------------------- */

const handleGetMetricProcurement = async(req, res) => {
    const { productId } = req.query;

    const { status, status_code, message, data} = await procurementService.handleGetMetricProcurement({
        daysBefore: 3,
        productId
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Metric Procurement  ------------------- */


/* ------------------- Handle Update Procurement  ------------------- */

const handleUpdateProcurement = async(req, res) => {
    const { id } = req.params;

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

    const { status, status_code, message, data} = await procurementService.handleUpdateProcurement({ 
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

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Procurement  ------------------- */


module.exports = { 
    handleCreateProcurement,
    handleGetProcurement,
    handleGetProcurementById,
    handleGetNotification,
    handleDeleteProcurementById,
    handleGetSummaryProcurement,
    handleGetMetricProcurement,
    handleUpdateProcurement
};