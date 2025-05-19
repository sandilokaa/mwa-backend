const partDesignService = require("../services/partDesignService");


/* ------------------- Handle Create Part Design  ------------------- */

const handleCreatePartDesign = async(req, res) => {
    const userId = req.admin.id;

    let picture = "";

    if (req.file) {
        picture = req.file.path;
    }

    const { 
        productId, 
        name,
        category
    } = req.body;

    const { status, status_code, message, data} = await partDesignService.handleCreatePartDesign({
        userId,
        productId,
        name,
        category,
        picture
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Create Part Design  ------------------- */


/* ------------------- Handle Get Part Design  ------------------- */

const handleGetPartDesign = async(req, res) => {

    const { productId, page = 1, limit = 5, category } = req.query;

    const { status, status_code, message, data} = await partDesignService.handleGetPartDesign({ 
        productId, 
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

/* ------------------- End Handle Get Part Design  ------------------- */


/* ------------------- Handle Get Part Design By Id  ------------------- */

const handleGetPartDesignById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await partDesignService.handleGetPartDesignById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Part Design By Id  ------------------- */


/* ------------------- Handle Delete Part Design By Id ------------------- */

const handleDeletePartDesignById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await partDesignService.handleDeletePartDesignById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Delete Part Design By Id ------------------- */


/* ------------------- Handle Update Part Design By Id  ------------------- */

const handleUpdatePartDesignById = async(req, res) => {
    const { id } = req.params;

    let picture = "";

    if (req.file) {
        picture = req.file.path;
    }

    const { 
        productId,  
        name,
        category
    } = req.body;

    const { status, status_code, message, data} = await partDesignService.handleUpdatePartDesignById({
        id,
        productId,
        name,
        category,
        picture
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Part Design By Id  ------------------- */


module.exports = {
    handleCreatePartDesign,
    handleGetPartDesign,
    handleGetPartDesignById,
    handleDeletePartDesignById,
    handleUpdatePartDesignById
}