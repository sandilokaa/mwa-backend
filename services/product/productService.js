const productRepository = require("../../repositories/product/productRepository");
const fileRemove = require("../../libs/utils/fileRemove");

class ProductService {

    /* ------------------- Handle Create Product  ------------------- */

    static async handleCreateProduct ({
        userId,
        name,
        tagline,
        description,
        picture
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const requiredFields = {
                name,
                tagline,
                description
            };
            
            const formatFieldName = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            for (const [key, value] of Object.entries(requiredFields)) {
                if (!value) {
                    return {
                        status: false,
                        status_code: 400,
                        message: `${formatFieldName(key)} is required!`,
                        data: {
                            product: null,
                        },
                    };
                }
            }
            // ------------------------- End Payload Validation ------------------------- //

            const productCreated = await productRepository.handleCreateProduct({
                userId,
                name,
                tagline,
                description,
                picture
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully created data",
                data: {
                    product: productCreated
                },
            }
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

    /* ------------------- End Handle Create Product  ------------------- */


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


    /* ------------------- Handle Get Product By Id  ------------------- */

    static async handleGetProductById({ id }) {
        try {
            const getProductById = await productRepository.handleGetProductById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    product: getProductById,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    product: null,
                },
            };
        }
    };

    /* ------------------- End Handle Get Product By Id  ------------------- */


    /* ------------------- Handle Delete Product By Id ------------------- */

    static async handleDeleteProductById({ id }) {
        try {

            const getProductById = await productRepository.handleGetProductById({ id });

            const deletedProduct = await productRepository.handleDeleteProductById({ id });

            fileRemove(getProductById.picture);

            return {
                status: true,
                status_code: 201,
                message: "Data deleted successfully",
                data: {
                    product: deletedProduct
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
            };
        }
    };

    /* ------------------- End Handle Delete Product By Id ------------------- */


    /* ------------------- Handle Update Product By Id  ------------------- */

    static async handleUpdateProductById ({ 
        id,
        name,
        tagline,
        description,
        picture
    }) {
        try {
            const getProductById = await productRepository.handleGetProductById({ id });

            if (getProductById.id == id) {
                if (!name) name = getProductById.name
                if (!tagline) tagline = getProductById.tagline
                if (!description) description = getProductById.description
                if (!picture) {
                    picture = getProductById.picture;
                } else {
                    fileRemove(getProductById.picture)
                }
            }

            const updatedProduct = await productRepository.handleUpdateProductById({
                id,
                name,
                tagline,
                description,
                picture
            });

            return {
                status: true,
                status_code: 201,
                message: "Successfully updated data",
                data: {
                    product: updatedProduct
                },
            }
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

    /* ------------------- End Handle Update Product By Id  ------------------- */

};

module.exports = ProductService;