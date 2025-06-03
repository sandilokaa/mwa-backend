const { PartDesigns, Products } = require("../../../models");
const { Op } = require("sequelize");

class PartDesignRepository {

    /* ------------------- Handle Create Part Design  ------------------- */

    static async handleCreatePartDesign ({
        userId,
        productId,
        name,
        category,
        picture
    }) {
        const partDesignCreated = await PartDesigns.create({
            userId,
            productId,
            name,
            category,
            picture
        });

        return partDesignCreated;
    };

    /* ------------------- End Handle Create Part Design  ------------------- */


    /* ------------------- Handle Get Part Design  ------------------- */

    static async handleGetPartDesign({ productId, page, limit, category }) {
        const offset = (page - 1) * limit;

        const query = {
            where: {},
            attributes: [
                'id',
                'productId',
                'name',
                'category',
                'picture'
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id'],
                    where: { id: productId }
                },
            ],
            offset,
            limit,
        };
        
        if (category) {
            query.where.category = {
                [Op.like]: `%${category}%`
            };
        }

        const getPartDesign = await PartDesigns.findAll(query);

        return getPartDesign;
    };

    /* ------------------- End Handle Get Part Design  ------------------- */


    /* ------------------- Handle Get Part Design By Id  ------------------- */

    static async handleGetPartDesignById({ id }) {
        const query = {
            where: { id },
            attributes: [
                'id',
                'productId',
                'name',
                'category',
                'picture'
            ],
        };
        
        const getPartDesignById = await PartDesigns.findOne(query);

        return getPartDesignById;
    };

    /* ------------------- End Handle Get Part Design By Id  ------------------- */


    /* ------------------- Handle Delete Part Design By Id ------------------- */

    static async handleDeletePartDesignById({ id }) {
        const deletedPartDesign = await PartDesigns.destroy({ where: { id } });

        return deletedPartDesign;
    };

    /* ------------------- End Handle Delete Part Design By Id ------------------- */


    /* ------------------- Handle Update Part Design By Id  ------------------- */

    static async handleUpdatePartDesignById({
        id,
        productId,
        name,
        category,
        picture
    }) {
        const updatedPartDesign = await PartDesigns.update({
            productId,
            name,
            category,
            picture
        }, {
            where: { id }
        });

        return updatedPartDesign;
    };

    /* ------------------- End Handle Update Part Design By Id  ------------------- */

};

module.exports = PartDesignRepository;