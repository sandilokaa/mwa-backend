const stylingDesignService = require("../services/stylingDesignService");


/* ------------------- Handle Create Styling Design  ------------------- */

const handleCreateStylingDesign = async(req, res) => {
    const userId = req.admin.id;

    let files = req.files;

    const picturePaths = files.map(file => file.path);

    const { 
        name,
        productId,
        stylingDesignId
    } = req.body;

    const { status, status_code, message, data} = await stylingDesignService.handleCreateStylingDesign({
        userId,
        stylingDesignId,
        productId,
        name,
        picture: picturePaths
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Create Styling Design  ------------------- */


/* ------------------- Handle Get Styling Design  ------------------- */

const handleGetStylingDesign = async(req, res) => {

    const { productId } = req.query;

    const { status, status_code, message, data} = await stylingDesignService.handleGetStylingDesign({ productId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Styling Design  ------------------- */


/* ------------------- Handle Get Styling Design By Id  ------------------- */

const handleGetStylingDesignById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await stylingDesignService.handleGetStylingDesignById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Styling Design By Id  ------------------- */


/* ------------------- Handle Update Styling Design By Id  ------------------- */

const handleUpdateStylingDesignById = async(req, res) => {
    const { id } = req.params;

    let picture = req.files;

    const picturePaths = picture.map(file => file.path);

    const { 
        productId,
        name,
        deletedImageId 
    } = req.body;

    const { status, status_code, message, data} = await stylingDesignService.handleUpdateStylingDesignById({
        id,
        productId,
        name,
        deletedImageId,
        picture: picturePaths
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Styling Design By Id  ------------------- */


module.exports = {
    handleCreateStylingDesign,
    handleGetStylingDesign,
    handleGetStylingDesignById,
    handleUpdateStylingDesignById
}