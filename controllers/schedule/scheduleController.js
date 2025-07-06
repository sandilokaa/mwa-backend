const scheduleService = require("../../services/schedule/scheduleService");

/* ------------------- Handle Get Schedule  ------------------- */

const handleGetSchedule = async(req, res) => {

    const { productId } = req.query;

    const { status, status_code, message, data} = await scheduleService.handleGetSchedule({ 
        productId,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Schedule  ------------------- */


/* ------------------- Handle Create Schedule  ------------------- */

const handleCreateSchedule = async(req, res) => {
    const userId = req.admin.id;

    const { 
        productId,
        scheduleName,
        pic,
        startDate,
        endDate
    } = req.body;

    const { status, status_code, message, data} = await scheduleService.handleCreateSchedule({
        userId,
        productId,
        scheduleName,
        pic,
        startDate,
        endDate
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Create Schedule  ------------------- */


/* ------------------- Handle Update Schedule  ------------------- */

const handleUpdateScheduleById = async(req, res) => {
    const { id } = req.params;

    const {  
        productId,
        scheduleName,
        pic,
        startDate,
        endDate
    } = req.body;

    const { status, status_code, message, data} = await scheduleService.handleUpdateScheduleById({ 
        id, 
        productId,
        scheduleName,
        pic,
        startDate,
        endDate
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Schedule  ------------------- */


/* ------------------- Handle Delete Schedule By Id  ------------------- */

const handleDeleteScheduleById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await scheduleService.handleDeleteScheduleById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Delete Schedule By Id  ------------------- */


/* ------------------- Handle Get Schedule By Id  ------------------- */

const handleGetScheduleById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await scheduleService.handleGetScheduleById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Schedule By Id  ------------------- */

module.exports = {
    handleCreateSchedule,
    handleGetSchedule,
    handleUpdateScheduleById,
    handleDeleteScheduleById,
    handleGetScheduleById
}