const engineeringService = require("../services/engineeringService");

/* ------------------- Handle Create Engineering  ------------------- */

const handleCreateEngineering = async(req, res) => {
    const userId = req.admin.id;

    let picture = "";

    if (req.file) {
        picture = req.file.path;
    }

    const { 
        productId,  
        engineeringId,
        partName,
        drawingNumber,
        category,
        pic3D,
        pic2DDXF,
        startDate,
        dateRequired,
        price,
        quantity,
        totalPrice,
        remark,
    } = req.body;

    const { status, status_code, message, data} = await engineeringService.handleCreateEngineering({
        userId,
        productId,
        engineeringId,
        partName,
        drawingNumber,
        category,
        pic3D,
        pic2DDXF,
        startDate,
        dateRequired,
        price,
        quantity,
        totalPrice,
        remark,
        picture
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Create Engineering  ------------------- */


/* ------------------- Handle Get Engineering  ------------------- */

const handleGetEngineering = async(req, res) => {

    const { productId, partName, page = 1, limit = 5, category } = req.query;

    const { status, status_code, message, data} = await engineeringService.handleGetEngineering({ 
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

/* ------------------- End Handle Get Engineering  ------------------- */


/* ------------------- Handle Get Engineering By Id  ------------------- */

const handleGetEngineeringById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await engineeringService.handleGetEngineeringById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Engineering By Id  ------------------- */


/* ------------------- Handle Delete Engineering By Id ------------------- */

const handleDeleteEngineeringById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await engineeringService.handleDeleteEngineeringById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Delete Engineering By Id ------------------- */


/* ------------------- Handle Get Summary Status Engineering  ------------------- */

const handleGetSummaryStatusEngineering = async(req, res) => {
    const { productId, category } = req.query;

    const { status, status_code, message, data} = await engineeringService.handleGetSummaryStatusEngineering({
        productId,
        category
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Summary Status Engineering  ------------------- */


/* ------------------- Handle Update Engineering By Id  ------------------- */

const handleUpdateEngineeringById = async(req, res) => {
    const { id } = req.params;

    let picture = "";

    if (req.file) {
        picture = req.file.path;
    }

    const { 
        productId,  
        partName,
        drawingNumber,
        category,
        pic3D,
        pic2DDXF,
        startDate,
        dateRequired,
        price,
        quantity,
        totalPrice,
        remark,
    } = req.body;

    const { status, status_code, message, data} = await engineeringService.handleUpdateEngineeringById({
        id,
        productId,
        partName,
        drawingNumber,
        category,
        pic3D,
        pic2DDXF,
        startDate,
        dateRequired,
        price,
        quantity,
        totalPrice,
        remark,
        picture
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Engineering By Id  ------------------- */


/* ------------------- Handle Update Status Engineering  ------------------- */

const handleUpdateStatusEngineering = async(req, res) => {
    const { id } = req.params;

    const { status3D, status2D, statusDXF } = req.body;

    const { status, status_code, message, data} = await engineeringService.handleUpdateStatusEngineering({ id, status3D, status2D, statusDXF });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Status Engineering  ------------------- */

module.exports = {
    handleCreateEngineering,
    handleGetEngineering,
    handleGetEngineeringById,
    handleDeleteEngineeringById,
    handleGetSummaryStatusEngineering,
    handleUpdateEngineeringById,
    handleUpdateStatusEngineering
}