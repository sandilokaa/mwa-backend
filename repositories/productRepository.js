const { Product } = require("../models");

class ProductRepository {

    /* ------------------- Handle Get Product ------------------- */

    static async handleGetProduct() {
        const query = {
            where: {},
            attributes: [
                'id', 
                'name', 
                'picture'
            ],
        };

        const getProduct = await Product.findAll(query);

        return getProduct;
    };

    /* ------------------- End Handle Get Product ------------------- */

};

module.exports = ProductRepository;