const { BudgetStatuses, Products } = require("../../../models");
const { Op } = require("sequelize");

class BudgetStatusUsageRepository {

    /* ------------------- Handle Create Budget Status Usage ------------------- */
    
    static async handleCreateBudgetStatusUsage ({
        userId,
        productId,
        system,
        subSystem,
        component,
        quantity,
        price,
        totalPrice,
        dateInput
    }) {
        const budgetStatusUsageCreated = await BudgetStatuses.create({
            userId,
            productId,
            system,
            subSystem,
            component,
            quantity,
            price,
            totalPrice,
            dateInput
        });

        return budgetStatusUsageCreated;
    };

    /* ------------------- End Handle Create Budget Status Usage ------------------- */


    /* ------------------- Handle Get Budget Status Usage ------------------- */

    static async handleGetAllBudgetStatusUsage({ productId, component, page, limit }) {
        const offset = (page - 1) * limit;

        const query = {
            where: {},
            attributes: [
                'id',
                'system',
                'subSystem',
                'component',
                'quantity',
                'price',
                'totalPrice'
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
        
        if (component) {
            query.where.component = {
                [Op.like]: `%${component}%`
            };
        }
        

        const result = await BudgetStatuses.findAndCountAll(query);

        return {
            budgetDataFiltered: result.rows,
            totalBS: result.count,
            currentPagesBS: page,
            totalPagesBS: Math.ceil(result.count / limit),
        };
    };

    /* ------------------- End Handle Get Budget Status Usage ------------------- */


    /* ------------------- Handle Get Budget Status Usage By Id  ------------------- */

    static async handleGetBudgetStatusUsageById({ id }) {
        const query = {
            where: { id },
            attributes: [
                'id',
                'productId',
                'system',
                'subSystem',
                'component',
                'quantity',
                'price',
                'totalPrice',
                'dateInput',
            ],
        };
        
        const getBudgetStatusUsage = BudgetStatuses.findOne(query);

        return getBudgetStatusUsage;
    };

    /* ------------------- End Handle Get Budget Status Usage By Id  ------------------- */


    /* ------------------- Handle Delete Budget Status Usage By Id  ------------------- */

    static async handleDeleteBudgetStatusUsage({ id }) {

        const deletedBudgetStatusUsage = await BudgetStatuses.destroy({ where: { id } });

        return deletedBudgetStatusUsage;

    };

    /* ------------------- End Handle Delete Budget Status Usage By Id  ------------------- */


    /* ------------------- Handle Update Budget Status Usage  ------------------- */

    static async handleUpdateBudgetStatusUsage({ 
        id, 
        productId,
        system,
        subSystem,
        component,
        quantity,
        price,
        totalPrice,
        dateInput
    }) {
        const updatedBudgetStatusUsage = await BudgetStatuses.update({
            productId,
            system,
            subSystem,
            component,
            quantity,
            price,
            totalPrice,
            dateInput
        }, {
            where: { id }
        });

        return updatedBudgetStatusUsage;
    };

    /* ------------------- End Handle Update Budget Status Usage  ------------------- */

};

module.exports = BudgetStatusUsageRepository;