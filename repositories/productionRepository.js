const { Productions, Products } = require("../models");

class ProductionRepository {

    /* ------------------- Handle Create Production  ------------------- */

    static async handleCreateProduction ({
        userId,
        productId,
        partName,
        partNumber,
        drawingNumber,
        picProduction,
        information,
        prodFile
    }) {
        const productionCreated = await Productions.create({
            userId,
            productId,  
            partName,
            partNumber,
            drawingNumber,
            picProduction,
            information,
            prodFile
        });

        return productionCreated;
    };

    /* ------------------- End Handle Create Production  ------------------- */


    /* ------------------- Handle Get Production  ------------------- */

static async handleGetProduction({ productId, partNumber, page, limit }) {
        const offset = (page - 1) * limit;

        const query = {
            where: {},
            attributes: [
                'id',
                'partName',
                'drawingNumber',
                'partNumber',
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
        
        if (partNumber) {
            query.where.partNumber = {
                [Op.like]: `%${partNumber}%`
            };
        }
        

        const result = await Productions.findAndCountAll(query);

        return {
            productDataFiltered: result.rows,
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
                'partNumber',
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

};

module.exports = ProductionRepository;