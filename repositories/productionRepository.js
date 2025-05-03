const { Productions, Products, sequelize } = require("../models");
const { Op } = require("sequelize");

class ProductionRepository {

    /* ------------------- Handle Create Production  ------------------- */

    static async handleCreateProduction ({
        userId,
        productId,
        partName,
        category,
        drawingNumber,
        picProduction,
        information,
        prodFile
    }) {
        const productionCreated = await Productions.create({
            userId,
            productId,  
            partName,
            category,
            drawingNumber,
            picProduction,
            information,
            prodFile
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
                'partName',
                'drawingNumber',
                'category',
                'information',
                'productionStatus',
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id', 'name'],
                    where: { id: productId }
                },
            ],
            offset,
            limit,
        };
        
        if (partName) {
            query.where.partName = {
                [Op.like]: `%${partName}%`
            };
        }
        
        if (category) {
            query.where.category = {
                [Op.like]: `%${category}%`
            };
        }
        

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
                'productId',
                'partName',
                'drawingNumber',
                'category',
                'picProduction',
                'productionStatus',
                'information',
                'prodFile',
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id', 'name']    
                }
            ],
        };
        
        const getProductionById = Productions.findOne(query);

        return getProductionById;
    };

    /* ------------------- End Handle Get Production By Id  ------------------- */


    /* ------------------- Handle Delete Production By Id ------------------- */

    static async handleDeleteProductionById({ id }) {
        const deletedProduction = await Productions.destroy({ where: { id } });

        return deletedProduction;
    };

    /* ------------------- End Handle Delete Production By Id ------------------- */


    /* ------------------- Handle Update Production By Id  ------------------- */

    static async handleUpdateProductionById({
        id,
        productId, 
        partName,
        drawingNumber,
        picProduction,
        information,
        category,
        prodFile
    }) {
        const updatedProduction = await Productions.update({
            productId, 
            partName,
            drawingNumber,
            picProduction,
            information,
            category,
            prodFile
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
                    attributes: ['id', 'name'],
                    where: { id: productId }
                },
            ],
            group: ['productionStatus']
        };

        if (category) {
            query.where.category = {
                [Op.like]: `%${category}%`
            };
        }

        const getSummary = await Productions.findAll(query);

        return getSummary;
    };

    /* ------------------- End Handle Get Summary Status Production  ------------------- */

};

module.exports = ProductionRepository;