const { PhotoUpdate, Product } = require("../models");
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
        const photoUpdateCreated = await PhotoUpdate.create({
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
                    model: Product,
                    attributes: ['id', 'name'],
                    where: { id: productId }
                },
            ],
        };
    
        if (category) {
            query.where.category = category;
        }

        const getPhotoUpdate = await PhotoUpdate.findAll(query);

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
                'picture'
            ],
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name']    
                }
            ],
        };
        
        const getPhotoUpdate = PhotoUpdate.findOne(query);

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
        const updatedPhoto = await PhotoUpdate.update({
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
        const deletedPhotoUpdate = await PhotoUpdate.destroy({ where: { id } });

        return deletedPhotoUpdate;
    };

    /* ------------------- End Handle Delete Photo Update By Id ------------------- */

};

module.exports = PhotoUpdateRepository;