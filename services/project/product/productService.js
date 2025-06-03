const productRepository = require("../../../repositories/project/product/productRepository");

class ProductService {

    /* ------------------- Handle Get Product ------------------- */

    static async handleGetProduct() {
        try {
            const getProduct = await productRepository.handleGetProduct();
    
            return {
                status: true,
                status_code: 200,
                message: "Successfully displayed product",
                data: {
                    product: getProduct
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    product: null
                },
            }
        }
    };

    /* ------------------- End Handle Get Product ------------------- */

};

module.exports = ProductService;