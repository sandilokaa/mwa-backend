const productService = require("../../services/product/productService");


/* ------------------- Handle Create Product  ------------------- */

const handleCreateProduct = async(req, res) => {
    const userId = req.admin.id;

    let picture = "";

    if (req.file) {
        picture = req.file.path;
    }

    const { 
        name,
        tagline,
        description
    } = req.body;

    const { status, status_code, message, data} = await productService.handleCreateProduct({
        userId,
        name,
        tagline,
        description,
        picture
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Create Product  ------------------- */


/* ------------------- Handle Get Product ------------------- */

const handleGetProduct = async(req, res) => {
    const { status, status_code, message, data} = await productService.handleGetProduct();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Product ------------------- */


/* ------------------- Handle Get Product By Id  ------------------- */

const handleGetProductById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await productService.handleGetProductById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Product By Id  ------------------- */


/* ------------------- Handle Delete Product By Id ------------------- */

const handleDeleteProductById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await productService.handleDeleteProductById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Delete Product By Id ------------------- */


/* ------------------- Handle Update Product By Id  ------------------- */

const handleUpdateProductById = async(req, res) => {
    const { id } = req.params;

    let picture = "";

    if (req.file) {
        picture = req.file.path;
    }

    const { 
        name,
        tagline,
        description
    } = req.body;

    const { status, status_code, message, data} = await productService.handleUpdateProductById({
        id,
        name,
        tagline,
        description,
        picture
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Product By Id  ------------------- */

module.exports = { 
    handleGetProduct,
    handleCreateProduct,
    handleGetProductById,
    handleDeleteProductById,
    handleUpdateProductById
};