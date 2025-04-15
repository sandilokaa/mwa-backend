const { Products } = require("../models");

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

        const getProduct = await Products.findAll(query);

        return getProduct;
    };

    /* ------------------- End Handle Get Product ------------------- */

};

module.exports = ProductRepository;