const productService = require("../../../services/project/product/productService");

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

module.exports = { 
    handleGetProduct
};