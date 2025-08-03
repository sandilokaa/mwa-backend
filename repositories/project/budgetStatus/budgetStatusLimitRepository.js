const { BudgetLimits, Products } = require("../../../models");
const { Op } = require("sequelize");

class BudgetStatusLimitRepository {

    /* ------------------- Handle Create Budget Status Limit ------------------- */
    
    static async handleCreateBudgetStatusLimit ({
        userId,
        productId,
        system,
        limit,
        month,
        year
    }) {
        const budgetStatusLimitCreated = await BudgetLimits.create({
            userId,
            productId,
            system,
            limit,
            month,
            year
        });

        return budgetStatusLimitCreated;
    };

    /* ------------------- End Handle Create Budget Status Limit ------------------- */


    /* ------------------- Handle Get Budget Status Limit ------------------- */

    static async handleGetAllBudgetStatusLimit({ productId, system, month, year, page, limit }) {
        const offset = (page - 1) * limit;

        const query = {
            where: {},
            attributes: [
                'id',
                'system',
                'limit',
                'month',
                'year'
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
        
        if (system) {
            query.where.system = {
                [Op.like]: `%${system}%`
            };
        }

        if (month) {
            query.where.month = {
                [Op.like]: `%${month}%`
            };
        }

        if (year) {
            query.where.year = {
                [Op.like]: `%${year}%`
            };
        }

        const result = await BudgetLimits.findAndCountAll(query);

        return {
            budgetLimitDataFiltered: result.rows,
            totalBudgetLimit: result.count,
            currentPagesBudgetLimit: page,
            totalPagesBudgetLimit: Math.ceil(result.count / limit),
        };
    };

    /* ------------------- End Handle Get Budget Status Limit ------------------- */


    /* ------------------- Handle Get Budget Status Limit By Id  ------------------- */

    static async handleGetBudgetStatusLimitById({ id }) {
        const query = {
            where: { id },
            attributes: [
                'id',
                'productId',
                'system',
                'limit',
                'month',
                'year'
            ],
        };
        
        const getBudgetStatusLimit = BudgetLimits.findOne(query);

        return getBudgetStatusLimit;
    };

    /* ------------------- End Handle Get Budget Status Limit By Id  ------------------- */


    /* ------------------- Handle Update Budget Status Limit  ------------------- */

    static async handleUpdateBudgetStatusLimit({ 
        id, 
        productId,
        system,
        limit,
        month,
        year
    }) {
        const updatedBudgetStatusLimit = await BudgetLimits.update({
            productId,
            system,
            limit,
            month,
            year
        }, {
            where: { id }
        });

        return updatedBudgetStatusLimit;
    };

    /* ------------------- End Handle Update Budget Status Limit  ------------------- */


    /* ------------------- Handle Delete Budget Status Limit By Id  ------------------- */

    static async handleDeleteBudgetStatusLimit({ id }) {

        const deletedBudgetStatusLimit = await BudgetLimits.destroy({ where: { id } });

        return deletedBudgetStatusLimit;

    };

    /* ------------------- End Handle Delete Budget Status Limit By Id  ------------------- */


    /* ------------------- Handle Get Budget Status Limit By Id  ------------------- */

    static async handleGetBudgetStatusLimitById({ id }) {
        const query = {
            where: { id },
            attributes: [
                'id',
                'productId',
                'system',
                'limit',
                'month',
                'year'
            ],
        };
        
        const getBudgetStatusLimit = BudgetLimits.findOne(query);

        return getBudgetStatusLimit;
    };

    /* ------------------- End Handle Get Budget Status Limit By Id  ------------------- */
};

module.exports = BudgetStatusLimitRepository;