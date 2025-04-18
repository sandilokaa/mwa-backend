const { Op } = require("sequelize");
const { Procurements, Products, sequelize } = require("../models");

class ProcurementRepository {

    /* ------------------- Handle Create Procurement  ------------------- */

    static async handleCreateProcurement ({
        userId,
        productId,  
        itemName,
        submissionDate,
        etaTarget,
        prNumber,
        poNumber,
        quantity,
        vendor
    }) {
        const procurementCreated = await Procurements.create({
            userId,
            productId,  
            itemName,
            submissionDate,
            etaTarget,
            prNumber,
            poNumber,
            quantity,
            vendor
        });

        return procurementCreated;
    };

    /* ------------------- End Handle Create Procurement  ------------------- */


    /* ------------------- Handle Get Procurement  ------------------- */

    static async handleGetProcurement({ productId, prNumber }) {
        const query = {
            where: {},
            attributes: [
                'id',
                'itemName',
                'prNumber',
                'etaTarget',
                'poNumber',
                'progress',
                'statusProc' 
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id', 'name'],
                    where: { id: productId }
                },
            ],
        };
        
        if (prNumber) {
            query.where.prNumber = {
                [Op.like]: `%${prNumber}%`
            };
        }

        const getProcurement = await Procurements.findAll(query);

        return getProcurement;
    };

    /* ------------------- End Handle Get Procurement  ------------------- */


    /* ------------------- Handle Get Procurement By Id  ------------------- */

    static async handleGetProcurementById({ id }) {
        const query = {
            where: { id },
            attributes: [
                'id',
                'productId',
                'itemName',
                'prNumber',
                'etaTarget',
                'poNumber',
                'progress',
                'statusProc',
                'submissionDate',
                'quantity',
                'vendor'
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id', 'name']    
                }
            ],
        };
        
        const getProcurementById = Procurements.findOne(query);

        return getProcurementById;
    };

    /* ------------------- End Handle Get Procurement By Id  ------------------- */


    /* ------------------- Handle Get Notification  ------------------- */

    static async handleGetNotification({ daysBefore, productId, page, limit }) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const targetDateMin = new Date(today);
        targetDateMin.setDate(today.getDate());

        const targetDateMax = new Date(today);
        targetDateMax.setDate(today.getDate() + daysBefore);
        targetDateMax.setHours(23, 59, 59, 999);

        const offset = (page - 1) * limit;

        const query = {
            where: {
                etaTarget: {
                    [Op.gte]: targetDateMin,
                    [Op.lte]: targetDateMax
                },
                progress: {
                    [Op.not]: 'delivered'
                }
            },
            attributes: [
                'id',
                'prNumber',
                'etaTarget',
            ],
            include: [
                {
                    model: Products,
                    where: { id: productId }    
                }
            ],
            offset,
            limit,
            order: [['etaTarget', 'ASC']],
        };

        const result = await Procurements.findAndCountAll(query);

        return {
            data: result.rows,
            total: result.count,
            currentPage: page,
            totalPages: Math.ceil(result.count / limit),
        };
    };

    /* ------------------- End Handle Get Notification  ------------------- */


    /* ------------------- Handle Delete Procurement By Id  ------------------- */

    static async handleDeleteProcurementById({ id }) {

        const deletedProcurement = await Procurements.destroy({ where: { id } });

        return deletedProcurement;

    };

    /* ------------------- End Handle Delete Procurement By Id  ------------------- */


    /* ------------------- Handle Get Summary Procurement  ------------------- */

    static async handleGetSummaryProcurement({ productId }) {
        const query = {
            where: {},
            attributes: [
                'progress',
                [sequelize.fn('COUNT', sequelize.col('progress')), 'count']
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id', 'name'],
                    where: { id: productId }
                },
            ],
            group: ['progress']
        };

        const getSummary = await Procurements.findAll(query);

        return getSummary;
    };

    /* ------------------- End Handle Get Summary Procurement  ------------------- */


    /* ------------------- Handle Get Metric Procurement  ------------------- */

    static async handleGetMetricProcurement({ productId }) {
        const query = {
            where: {},
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('Procurements.id')), 'total']
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id', 'name'],
                    where: { id: productId }
                },
            ],
        };

        const totalProcurement = await Procurements.findOne(query);

        return totalProcurement ? totalProcurement.get('total') : 0; 
    };

    /* ------------------- Handle Get Metric Procurement  ------------------- */


    /* ------------------- Handle Update Procurement  ------------------- */

    static async handleUpdateProcurement({ 
        id,
        productId,  
        itemName,
        submissionDate,
        etaTarget,
        prNumber,
        poNumber,
        quantity,
        vendor
    }) {
        const updatedProcurement = await Procurements.update({
            productId,  
            itemName,
            submissionDate,
            etaTarget,
            prNumber,
            poNumber,
            quantity,
            vendor
        }, {
            where: { id }
        });

        return updatedProcurement;
    };

    /* ------------------- End Handle Update Procurement  ------------------- */

};

module.exports = ProcurementRepository;