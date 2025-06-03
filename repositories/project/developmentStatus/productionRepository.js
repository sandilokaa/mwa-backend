const { Productions, Products, Engineerings, sequelize } = require("../../../models");
const { Op } = require("sequelize");

class ProductionRepository {

    /* ------------------- Handle Create Production  ------------------- */

    static async handleCreateProduction ({
        userId,
        productId,
        engineeringId,
        picProduction,
    }) {
        const productionCreated = await Productions.create({
            userId,
            productId, 
            engineeringId, 
            picProduction,
        });

        return productionCreated;
    };

    /* ------------------- End Handle Create Production  ------------------- */

    /* ------------------- Handle Get Production  ------------------- */

    static async handleGetProduction({ productId, partName, page, limit, category }) {
        const offset = (page - 1) * limit;

        const query = {
            where: {},
            attributes: [
                'id',
                'productId',
                'productionStatus'
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id'],
                    where: { id: productId }
                },
                {
                    model: Engineerings,
                    attributes: ['partName', 'drawingNumber', 'category', 'remark'],
                    where: {
                        ...(partName && { partName: { [Op.like]: `%${partName}%` } }),
                        ...(category && { category: { [Op.like]: `%${category}%` } }),
                    }
                }
            ],
            offset,
            limit,
        };

        const result = await Productions.findAndCountAll(query);

        return {
            productionDataFiltered: result.rows,
            totalProd: result.count,
            currentPagesProd: page,
            totalPagesProd: Math.ceil(result.count / limit),
        };
    };

    /* ------------------- End Handle Get Production  ------------------- */


    /* ------------------- Handle Get Production By Id  ------------------- */

    static async handleGetProductionById({ id }) {
        const query = {
            where: { id },
            attributes: [
                'id',
                'picProduction',
                'productionStatus',
            ],
            include: [
                {
                    model: Engineerings,
                    attributes: ['partName', 'drawingNumber', 'category', 'remark']
                }
            ],
        };
        
        const getProductionById = Productions.findOne(query);

        return getProductionById;
    };

    /* ------------------- End Handle Get Production By Id  ------------------- */


    /* ------------------- Handle Update Production By Id  ------------------- */

    static async handleUpdateProductionById({
        id,
        picProduction,
    }) {
        const updatedProduction = await Productions.update({
            picProduction,
        }, {
            where: { id }
        });

        return updatedProduction;
    };

    /* ------------------- End Handle Update Production By Id  ------------------- */


    /* ------------------- Handle Update Status Production  ------------------- */

    static async handleUpdateStatusProduction({ 
        id,
        productionStatus
    }) {
        const updatedProductionStatus = await Productions.update({
            productionStatus
        }, {
            where: { id }
        });

        return updatedProductionStatus;
    };

    /* ------------------- End Handle Update Status Production  ------------------- */


    /* ------------------- Handle Get Summary Status Production  ------------------- */

    static async handleGetSummaryStatusProduction({ productId, category }) {
        const query = {
            where: {},
            attributes: [
                'productionStatus',
                [sequelize.fn('COUNT', sequelize.col('productionStatus')), 'count']
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id'],
                    where: { id: productId }
                },
                {
                    model: Engineerings,
                    attributes: ['id'],
                    where: {
                        ...(category && { category: { [Op.like]: `%${category}%` } }),
                    }
                },
            ],
            group: ['productionStatus']
        };

        const getSummary = await Productions.findAll(query);

        return getSummary;
    };

    /* ------------------- End Handle Get Summary Status Production  ------------------- */


    /* ------------------- Handle Delete Production By Id ------------------- */

    static async handleDeleteProductionByEngineeringId({ engineeringId }) {
        const deletedProduction = await Productions.destroy({ where: { engineeringId } });

        return deletedProduction;
    };

    /* ------------------- End Handle Delete Production By Id ------------------- */

};

module.exports = ProductionRepository;