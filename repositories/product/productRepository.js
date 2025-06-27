const { Products } = require("../../models");

class ProductRepository {

    /* ------------------- Handle Create Product  ------------------- */

    static async handleCreateProduct ({
        userId,
        name,
        tagline,
        description,
        picture
    }) {
        const productCreated = await Products.create({
            userId,
            name,
            tagline,
            description,
            picture
        });

        return productCreated;
    };


    /* ------------------- End Handle Create Product  ------------------- */


    /* ------------------- Handle Get Product ------------------- */

    static async handleGetProduct() {
        const query = {
            where: {},
            attributes: [
                'id', 
                'name', 
                'tagline', 
                'picture'
            ],
        };

        const getProduct = await Products.findAll(query);

        return getProduct;
    };

    /* ------------------- End Handle Get Product ------------------- */


    /* ------------------- Handle Get Product By Id  ------------------- */

    static async handleGetProductById({ id }) {
        const query = {
            where: { id },
            attributes: [
                'id',
                'name',
                'tagline',
                'description',
                'picture'
            ]
        };
        
        const getProductById = await Products.findOne(query);

        return getProductById;
    };

    /* ------------------- End Handle Get Product By Id  ------------------- */


    /* ------------------- Handle Delete Product By Id ------------------- */

    static async handleDeleteProductById({ id }) {
        const deletedProduct = await Products.destroy({ where: { id } });

        return deletedProduct;
    };

    /* ------------------- End Handle Delete Product By Id ------------------- */


    /* ------------------- Handle Update Product By Id  ------------------- */

    static async handleUpdateProductById({
        id,
        name,
        tagline,
        description,
        picture
    }) {
        const updatedProduct = await Products.update({
            name,
            tagline,
            description,
            picture
        }, {
            where: { id }
        });

        return updatedProduct;
    };

    /* ------------------- Handle Update Product By Id  ------------------- */

};

module.exports = ProductRepository;