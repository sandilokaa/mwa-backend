const stylingDesignRepository = require("../repositories/stylingDesignRepository");

class StylingDesignService {

    /* ------------------- Handle Create Styling Design  ------------------- */

    static async handleCreateStylingDesign ({
        userId,
        stylingDesignId,
        productId,
        name,
        picture
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const requiredFields = {
                productId,
                name,
            };
            
            const formatFieldName = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            for (const [key, value] of Object.entries(requiredFields)) {
                if (!value) {
                    return {
                        status: false,
                        status_code: 400,
                        message: `${formatFieldName(key)} is required!`,
                        data: {
                            stylingDesign: null,
                        },
                    };
                }
            }
            // ------------------------- End Payload Validation ------------------------- //

            const stylingDesignCreated = await stylingDesignRepository.handleCreateStylingDesign({
                userId,
                productId,
                name
            });

            const stylingDesignImageCreated = await stylingDesignRepository.handleCreateStylingDesignImages({
                stylingDesignId: stylingDesignCreated.id,
                picture
            })

            return {
                status: true,
                status_code: 201,
                message: "Successfully created data",
                data: {
                    stylingDesign: stylingDesignCreated,
                    stylingDesignImage: stylingDesignImageCreated
                },
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    stylingDesign: null,
                    stylingDesignImage: null
                },
            }
        }
    };

    /* ------------------- End Handle Create Styling Design  ------------------- */


    /* ------------------- Handle Get Styling Design  ------------------- */

    static async handleGetStylingDesign({ productId }) {
        try {
            const getStylingDesign = await stylingDesignRepository.handleGetStylingDesign({ productId });

            return {
                status: true,
                status_code: 200,
                message: "Successfully displayed styling design",
                data: {
                    stylingDesign: getStylingDesign
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    stylingDesign: null
                },
            }
        }
    };

    /* ------------------- End Handle Get Styling Design  ------------------- */


    /* ------------------- Handle Get Styling Design By Id  ------------------- */

    static async handleGetStylingDesignById({ id }) {
        try {
            const getStylingDesignById = await stylingDesignRepository.handleGetStylingDesignById({ id });

            return {
                status: true,
                status_code: 200,
                message: "Data displayed successfully!",
                data: {
                    stylingDesign: getStylingDesignById,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    stylingDesign: null,
                },
            };
        }
    };

    /* ------------------- End Handle Get Styling Design By Id  ------------------- */

};

module.exports = StylingDesignService;