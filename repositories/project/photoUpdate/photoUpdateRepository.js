const { PhotoUpdates, Products } = require("../../../models");
const { Op, where } = require("sequelize");

class PhotoUpdateRepository {

    /* ------------------- Handle Create Photo Update  ------------------- */

    static async handleCreatePhotoUpdate ({ 
        userId,
        productId, 
        category, 
        dateInput, 
        information,
        picture
    }) {
        const photoUpdateCreated = await PhotoUpdates.create({
            userId,
            productId, 
            category, 
            dateInput, 
            information,
            picture
        });

        return photoUpdateCreated;
    };

    /* ------------------- End Handle Create Photo Update  ------------------- */


    /* ------------------- Handle Get Photo Update  ------------------- */

    static async handleGetPhotoUpdate({ category, productId }) {
        const query = {
            where: {},
            attributes: [
                'id', 
                'dateInput', 
                'information', 
                'picture'
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id', 'name'],
                    where: { id: productId }
                },
            ],
        };
    
        if (category) {
            query.where.category = category;
        }

        const getPhotoUpdate = await PhotoUpdates.findAll(query);

        return getPhotoUpdate;
    };

    /* ------------------- End Handle Get Photo Update  ------------------- */


    /* ------------------- Handle Get Photo Update By Id  ------------------- */

    static async handleGetPhotoUpdateById({ id }) {
        const query = {
            where: { id },
            attributes: [
                'id',
                'dateInput',
                'information',
                'picture',
                'productId',
                'category'
            ],
        };
        
        const getPhotoUpdate = PhotoUpdates.findOne(query);

        return getPhotoUpdate;
    };

    /* ------------------- End Handle Get Photo Update By Id  ------------------- */


    /* ------------------- Handle Update Photo Update By Id ------------------- */

    static async handleUpdatePhotoUpdateById({
        id,
        productId, 
        category, 
        dateInput, 
        information,
        picture
    }) {
        const updatedPhoto = await PhotoUpdates.update({
            productId, 
            category, 
            dateInput, 
            information,
            picture
        }, {
            where: { id }
        });

        return updatedPhoto;
    };

    /* ------------------- End Handle Update Photo Update By Id ------------------- */


    /* ------------------- Handle Delete Photo Update By Id ------------------- */

    static async handleDeletePhotoUpdateById({ id }) {
        const deletedPhotoUpdate = await PhotoUpdates.destroy({ where: { id } });

        return deletedPhotoUpdate;
    };

    /* ------------------- End Handle Delete Photo Update By Id ------------------- */

};

module.exports = PhotoUpdateRepository;