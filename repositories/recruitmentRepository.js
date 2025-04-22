const { Recruitments, sequelize } = require("../models");
const { Op } = require("sequelize");

class RecruitmentRepository {

    /* ------------------- Handle Create Recruitment  ------------------- */

    static async handleCreateRecruitment ({
            userId,
            name,
            position,
            division,
            submissionDate,
            joinDate
        }) {
            const recruitmentCreated = await Recruitments.create({
                userId,
                name,
                position,
                division,
                submissionDate,
                joinDate
            });
    
            return recruitmentCreated;
        };

    /* ------------------- End Handle Create Recruitment  ------------------- */


    /* ------------------- Handle Get Recruitment  ------------------- */
    
        static async handleGetRecruitment({ name, page, limit }) {
            const offset = (page - 1) * limit;
    
            const query = {
                where: {},
                attributes: [
                    'id',
                    'name',
                    'position',
                    'division',
                    'joinDate',
                    'progress',
                    'statusRec' 
                ],
                offset,
                limit,
            };
            
            if (name) {
                query.where.name = {
                    [Op.like]: `%${name}%`
                };
            }
            
    
            const result = await Recruitments.findAndCountAll(query);
    
            return {
                recruitmentDataFiltered: result.rows,
                totalRec: result.count,
                currentPagesRec: page,
                totalPagesRec: Math.ceil(result.count / limit),
            };
        };
    
        /* ------------------- End Handle Get Recruitment  ------------------- */


        /* ------------------- Handle Get Recruitment By Id  ------------------- */

    static async handleGetRecruitmentById({ id }) {
        const query = {
            where: { id },
            attributes: [
                'id',
                'name',
                'position',
                'division',
                'joinDate',
                'submissionDate',
                'progress',
                'statusRec' 
            ],
        };
        
        const getRecruitmentById = Recruitments.findOne(query);

        return getRecruitmentById;
    };

    /* ------------------- End Handle Get Recruitment By Id  ------------------- */


    /* ------------------- Handle Get Metric Recruitment  ------------------- */

    static async handleGetMetricRecruitment() {
        const query = {
            where: {},
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('Recruitments.id')), 'total']
            ],
        };

        const totalRecruitment = await Recruitments.findOne(query);

        return totalRecruitment ? totalRecruitment.get('total') : 0; 
    };

    /* ------------------- Handle Get Metric Recruitment  ------------------- */


    /* ------------------- Handle Delete Recruitment By Id  ------------------- */

    static async handleDeleteRecruitmentById({ id }) {

        const deletedRecruitment = await Recruitments.destroy({ where: { id } });

        return deletedRecruitment;

    };

    /* ------------------- End Handle Delete Recruitment By Id  ------------------- */

};

module.exports = RecruitmentRepository;