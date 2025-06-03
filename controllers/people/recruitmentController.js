const recruitmentService = require("../../services/people/recruitmentService");

/* ------------------- Handle Create Recruitment  ------------------- */

const handleCreateRecruitment = async(req, res) => {
    const userId = req.admin.id;

    const { 
        name,
        position,
        division,
        submissionDate,
        joinDate
    } = req.body;

    const { status, status_code, message, data} = await recruitmentService.handleCreateRecruitment({
        userId,
        name,
        position,
        division,
        submissionDate,
        joinDate
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Create Recruitment  ------------------- */


/* ------------------- Handle Get Recruitment  ------------------- */

const handleGetRecruitment = async(req, res) => {

    const { name, page = 1, limit = 5 } = req.query;

    const { status, status_code, message, data} = await recruitmentService.handleGetRecruitment({ 
        name,
        page: parseInt(page),
        limit: parseInt(limit)
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Recruitment  ------------------- */


/* ------------------- Handle Get Recruitment By Id  ------------------- */

const handleGetRecruitmentById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await recruitmentService.handleGetRecruitmentById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Recruitment By Id  ------------------- */


/* ------------------- Handle Get Metric Recruitment  ------------------- */

const handleGetMetricRecruitment = async(req, res) => {
    const { status, status_code, message, data} = await recruitmentService.handleGetMetricRecruitment();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Metric Recruitment  ------------------- */


/* ------------------- Handle Delete Recruitment By Id  ------------------- */

const handleDeleteRecruitmentById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await recruitmentService.handleDeleteRecruitmentById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Delete Recruitment By Id  ------------------- */


/* ------------------- Handle Update Recruitment By Id  ------------------- */

const handleUpdateRecruitment = async(req, res) => {
    const { id } = req.params;

    const { 
        name,
        position,
        division,
        submissionDate,
        joinDate
    } = req.body;

    const { status, status_code, message, data} = await recruitmentService.handleUpdateRecruitment({ 
        id,
        name,
        position,
        division,
        submissionDate,
        joinDate
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Recruitment By Id  ------------------- */


/* ------------------- Handle Get Notification  ------------------- */

const handleGetNotification = async(req, res) => {
    const { page = 1, limit = 4 } = req.query;

    const { status, status_code, message, data} = await recruitmentService.handleGetNotification({
        daysBefore: 3,
        page: parseInt(page),
        limit: parseInt(limit)
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Notification  ------------------- */


/* ------------------- Handle Update Progress Recruitment  ------------------- */

const handleUpdateProgressRecruitment = async(req, res) => {
    const { id } = req.params;

    const { progress } = req.body;

    const { status, status_code, message, data} = await recruitmentService.handleUpdateProgressRecruitment({ id, progress });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Progress Recruitment  ------------------- */


/* ------------------- Handle Get Summary Recruitment  ------------------- */

const handleGetSummaryRecruitment = async(req, res) => {

    const { status, status_code, message, data} = await recruitmentService.handleGetSummaryRecruitment();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Summary Recruitment  ------------------- */


module.exports = {
    handleCreateRecruitment,
    handleGetRecruitment,
    handleGetRecruitmentById,
    handleGetMetricRecruitment,
    handleDeleteRecruitmentById,
    handleUpdateRecruitment,
    handleGetNotification,
    handleUpdateProgressRecruitment,
    handleGetSummaryRecruitment
}