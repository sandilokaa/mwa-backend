const { Engineerings, Products, sequelize } = require("../models");
const { Op } = require("sequelize");

class EngineeringRepository {

    /* ------------------- Handle Create Engineering  ------------------- */

    static async handleCreateEngineering ({
        userId,
        productId,
        partName,
        drawingNumber,
        category,
        pic3D,
        pic2DDXF,
        startDate,
        dateRequired,
        price,
        quantity,
        totalPrice,
        remark,
        picture
    }) {
        const engineeringCreated = await Engineerings.create({
            userId,
            productId,
            partName,
            drawingNumber,
            category,
            pic3D,
            pic2DDXF,
            startDate,
            dateRequired,
            price,
            quantity,
            totalPrice,
            remark,
            picture
        });

        return engineeringCreated;
    };

    /* ------------------- End Handle Create Engineering  ------------------- */


    /* ------------------- Handle Get Engineering  ------------------- */

    static async handleGetEngineering({ productId, partName, page, limit, category }) {
        const offset = (page - 1) * limit;

        const query = {
            where: {},
            attributes: [
                'id',
                'productId',
                'partName',
                'drawingNumber',
                'remark',
                'status3D',
                'status2D',
                'statusDXF',
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

        const result = await Engineerings.findAndCountAll(query);

        return {
            engineeringDataFiltered: result.rows,
            totalEngine: result.count,
            currentPagesEngine: page,
            totalPagesEngine: Math.ceil(result.count / limit),
        };
    };

    /* ------------------- End Handle Get Engineering  ------------------- */


    /* ------------------- Handle Get Engineering By Id  ------------------- */

    static async handleGetEngineeringById({ id }) {
        const query = {
            where: { id },
            attributes: [
                'id',
                'productId',
                'partName',
                'drawingNumber',
                'category',
                'remark',
                'status3D',
                'status2D',
                'statusDXF',
                'pic3D',
                'pic2DDXF',
                'startDate',
                'dateRequired',
                'price',
                'quantity',
                'totalPrice',
                'picture'
            ]
        };
        
        const getEngineeringById = await Engineerings.findOne(query);

        return getEngineeringById;
    };

    /* ------------------- End Handle Get Engineering By Id  ------------------- */


    /* ------------------- Handle Delete Engineering By Id ------------------- */

    static async handleDeleteEngineeringById({ id }) {
        const deletedEngineering = await Engineerings.destroy({ where: { id } });

        return deletedEngineering;
    };

    /* ------------------- End Handle Delete Engineering By Id ------------------- */


    /* ------------------- Handle Get Summary Status Engineering  ------------------- */

    static async handleGetSummaryStatusEngineering({ productId, category }) {
        const query = {};
    
        if (productId) {
            query.productId = productId;
        }
        
        if (category) {
            query.category = category;
        }

        const summary3D = await Engineerings.findAll({
            where: query,
            attributes: ['status3D', [sequelize.fn('COUNT', sequelize.col('status3D')), 'count']],
            group: ['status3D'],
            raw: true
        });

        const summary2D = await Engineerings.findAll({
            where: query,
            attributes: ['status2D', [sequelize.fn('COUNT', sequelize.col('status2D')), 'count']],
            group: ['status2D'],
            raw: true
        });

        const summaryDXF = await Engineerings.findAll({
            where: query,
            attributes: ['statusDXF', [sequelize.fn('COUNT', sequelize.col('statusDXF')), 'count']],
            group: ['statusDXF'],
            raw: true
        });

        return {
            status3D: summary3D,
            status2D: summary2D,
            statusDXF: summaryDXF
        };
    };

    /* ------------------- End Handle Get Summary Status Engineering  ------------------- */


    /* ------------------- Handle Update Engineering By Id  ------------------- */

    static async handleUpdateEngineeringById({
        id,
        productId,
        partName,
        drawingNumber,
        category,
        pic3D,
        pic2DDXF,
        startDate,
        dateRequired,
        price,
        quantity,
        totalPrice,
        remark,
        picture
    }) {
        const updatedEngineering = await Engineerings.update({
            productId,
            partName,
            drawingNumber,
            category,
            pic3D,
            pic2DDXF,
            startDate,
            dateRequired,
            price,
            quantity,
            totalPrice,
            remark,
            picture
        }, {
            where: { id }
        });

        return updatedEngineering;
    };

    /* ------------------- End Handle Update Engineering By Id  ------------------- */


    /* ------------------- Handle Update Status Engineering  ------------------- */

    static async handleUpdateStatusEngineering({ 
        id,
        status3D, 
        status2D, 
        statusDXF
    }) {
        const updatedEngineeringStatus = await Engineerings.update({
            status3D, 
            status2D, 
            statusDXF
        }, {
            where: { id }
        });

        return updatedEngineeringStatus;
    };

    /* ------------------- End Handle Update Status Engineering  ------------------- */

};

module.exports = EngineeringRepository;