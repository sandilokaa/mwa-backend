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


    /* ------------------- Handle Update Recruitment By Id  ------------------- */

    static async handleUpdateRecruitment({ 
        id,
        name,
        position,
        division,
        submissionDate,
        joinDate
    }) {
        const updatedRecruitment = await Recruitments.update({
            name,
            position,
            division,
            submissionDate,
            joinDate
        }, {
            where: { id }
        });

        return updatedRecruitment;
    };

    /* ------------------- End Handle Update Recruitment By Id  ------------------- */


    /* ------------------- Handle Get Notification  ------------------- */

    static async handleGetNotification({ daysBefore, page, limit }) {
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
                joinDate: {
                    [Op.gte]: targetDateMin,
                    [Op.lte]: targetDateMax
                },
                progress: {
                    [Op.not]: 'offer letter'
                }
            },
            attributes: [
                'id',
                'name',
                'joinDate',
            ],
            offset,
            limit,
            order: [['joinDate', 'ASC']],
        };

        const result = await Recruitments.findAndCountAll(query);

        return {
            data: result.rows,
            total: result.count,
            currentPage: page,
            totalPages: Math.ceil(result.count / limit),
        };
    };

    /* ------------------- End Handle Get Notification  ------------------- */


    /* ------------------- Handle Update Status Recruitment  ------------------- */

    static async updateOverdueRecruitments() {
        return Recruitments.update(
            { statusRec: 'overdue' },
            {
                where: {
                    statusRec: 'on progress',
                    joinDate: {
                        [Op.lt]: new Date(),
                    },
                },
            }
        );
    };

    /* ------------------- End Handle Update Status Recruitment  ------------------- */


    /* ------------------- Handle Update Progress Recruitment  ------------------- */

    static async handleUpdateProgressRecruitment({ 
        id,
        progress,
        statusRec
    }) {
        const updatedRecruitment = await Recruitments.update({
            progress,
            statusRec
        }, {
            where: { id }
        });

        return updatedRecruitment;
    };

    /* ------------------- End Handle Update Progress Recruitment  ------------------- */

};

module.exports = RecruitmentRepository;