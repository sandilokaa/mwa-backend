const { StylingDesigns, StylingDesignImages, Products } = require("../../../models");

class StylingDesignRepository {

    /* ------------------- Handle Create Styling Design  ------------------- */

    static async handleCreateStylingDesign ({
        userId,
        productId,
        name,
    }) {
        const stylingDesignCreated = await StylingDesigns.create({
            userId,
            productId,
            name,
        });
        return stylingDesignCreated;
    };

    /* ------------------- End Handle Create Styling Design  ------------------- */


    /* ------------------- Handle Create Styling Design  ------------------- */

    static async handleCreateStylingDesignImages ({
        stylingDesignId,
        picture
    }) {
        const imageData = picture.map((imgPath) => ({
            stylingDesignId,
            picture: imgPath
        }));

        const stylingDesignImageCreated = await StylingDesignImages.bulkCreate(imageData);

        return stylingDesignImageCreated;
    };

    /* ------------------- End Handle Create Styling Design Images  ------------------- */


    /* ------------------- Handle Get Styling Design  ------------------- */

    static async handleGetStylingDesign({ productId }) {
        const query = {
            where: {},
            attributes: [
                'id',
                'productId',
                'name',
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id'],
                    where: { id: productId }
                },
                {
                    model: StylingDesignImages,
                    attributes: ['picture']
                }
            ],
        };

        const getStylingDesign = await StylingDesigns.findAll(query);

        return getStylingDesign;
    };

    /* ------------------- End Handle Get Styling Design  ------------------- */


    /* ------------------- Handle Get Styling Design By Id  ------------------- */

    static async handleGetStylingDesignById({ id }) {
        const query = {
            where: { id },
            attributes: [
                'id',
                'productId',
                'name',
            ],
            include: [
                {
                    model: StylingDesignImages,
                    attributes: ['id', 'stylingDesignId', 'picture']
                }
            ],
        };
        
        const getStylingDesignById = await StylingDesigns.findOne(query);

        return getStylingDesignById;
    };

    /* ------------------- End Handle Get Styling Design By Id  ------------------- */


    /* ------------------- Handle Get Styling Design Image By Id  ------------------- */

    static async handleGetStylingDesignImageById({ imageId }) {
        const query = {
            where: { id: imageId },
            attributes: [
                'id',
                'stylingDesignId',
                'picture',
            ],
        };
        
        const getStylingDesignImageById = await StylingDesignImages.findOne(query);

        return getStylingDesignImageById;
    };

    /* ------------------- End Handle Get Styling Design Image By Id  ------------------- */


    /* ------------------- Handle Update Styling Design Image By Id  ------------------- */

    static async handleUpdateStylingDesignById({
        id,
        productId,
        name,
    }) {
        const updatedStylingDesign = await StylingDesigns.update({
            productId,
            name,
        }, {
            where: { id }
        });

        return updatedStylingDesign;
    };

    /* ------------------- End Handle Update Styling Design Image By Id  ------------------- */


    /* ------------------- Handle Delete Styling Design Image By Id  ------------------- */

    static async handleDeleteStylingDesignImageById({ imageId }) {
        const deletedStylingDesignImage = await StylingDesignImages.destroy({ where: { id: imageId } });

        return deletedStylingDesignImage;
    };

    /* ------------------- End Handle Delete Styling Design Image By Id  ------------------- */


    /* ------------------- Handle Update Styling Design Image By Id  ------------------- */

    static async handleUpdateStylingDesignImageById({
        picture,
        imageId,
    }) {
        const updatedStylingDesignImage = await StylingDesignImages.update({
            picture,
        }, {
            where: { id: imageId }
        });

        return updatedStylingDesignImage;
    };

    /* ------------------- End Handle Update Styling Design Image By Id  ------------------- */

};

module.exports = StylingDesignRepository;