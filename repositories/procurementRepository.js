const { where, Op } = require("sequelize");
const { Procurements, Products } = require("../models");

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

    static async handleGetProcurement({ itemName, productId, prNumber }) {
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
    
        if (itemName) {
            query.where.itemName = {
                [Op.like]: `%${itemName}%`
            };
        }
        
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

    static async handleGetNotification({ daysBefore, productId }) {
        const today = new Date();
        const targetDate = new Date();
        targetDate.setDate(today.getDate() + daysBefore);

        const query = {
            where: {
                etaTarget: {
                    [Op.gte]: new Date(targetDate.setHours(0, 0, 0, 0)),
                    [Op.lt]: new Date(targetDate.setHours(23, 59, 59, 999))
                },
                progress: {
                    [Op.not]: 'delivered'
                }
            },
            attributes: [
                'id',
                'itemName',
                'prNumber',
                'etaTarget',
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id', 'name'],
                    where: { id: productId }    
                }
            ],
        };

        const getNotification = await Procurements.findAll(query);
        return getNotification;
    };

    /* ------------------- End Handle Get Notification  ------------------- */

};

module.exports = ProcurementRepository;