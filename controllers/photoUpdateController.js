const photoUpdateService = require("../services/photoUpdateService");

/* ------------------- Handle Create Photo Update  ------------------- */

const handleCreatePhotoUpdate = async(req, res) => {
    const userId = req.admin.id;

    let picture = "";

    if (req.file) {
        picture = req.file.path;
    }

    const { productId, category, dateInput, information } = req.body;

    const { status, status_code, message, data} = await photoUpdateService.handleCreatePhotoUpdate({
        userId,
        productId, 
        category, 
        dateInput, 
        information,
        picture
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Create Photo Update  ------------------- */


/* ------------------- Handle Get Photo Update  ------------------- */

const handleGetPhotoUpdate = async(req, res) => {
    const { category, productId } = req.query;

    const { status, status_code, message, data} = await photoUpdateService.handleGetPhotoUpdate({
        category,
        productId
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Photo Update  ------------------- */


/* ------------------- Handle Get Photo Update By Id  ------------------- */

const handleGetPhotoUpdateById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await photoUpdateService.handleGetPhotoUpdateById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Photo Update By Id ------------------- */


/* ------------------- Handle Update Photo Update By Id ------------------- */

const handleUpdatePhotoUpdateById = async(req, res) => {
    const { id } = req.params;

    let picture = "";

    if (req.file) {
        picture = req.file.path;
    }

    const { productId, category, dateInput, information } = req.body;

    const { status, status_code, message, data} = await photoUpdateService.handleUpdatePhotoUpdateById({
        id,
        productId, 
        category, 
        dateInput, 
        information,
        picture
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Photo Update By Id ------------------- */


/* ------------------- Handle Delete Photo Update By Id ------------------- */

const handleDeletePhotoUpdateById = async(req, res) => {
    const userId = req.admin.id;

    const { id } = req.params;

    const { status, status_code, message, data} = await photoUpdateService.handleDeletePhotoUpdateById({ id, userId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Delete Photo Update By Id ------------------- */

module.exports = { 
    handleCreatePhotoUpdate,
    handleGetPhotoUpdate,
    handleGetPhotoUpdateById,
    handleUpdatePhotoUpdateById,
    handleDeletePhotoUpdateById
};