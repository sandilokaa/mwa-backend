const highlightIssueService = require("../services/highlightIssueService");

/* ------------------- Handle Create Highlight Issue  ------------------- */

const handleCreateHighlightIssue = async(req, res) => {
    const userId = req.admin.id;

    const { 
        productId,
        itemName,
        category,
        pic,
        issue,
        countermeassure,
        dueDate
    } = req.body;

    const { status, status_code, message, data} = await highlightIssueService.handleCreateHighlightIssue({
        userId,
        productId,
        itemName,
        category,
        pic,
        issue,
        countermeassure,
        dueDate
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Create Highlight Issue  ------------------- */


/* ------------------- Handle Get Highlight Issue  ------------------- */

const handleGetHighlightIssue = async(req, res) => {

    const { itemName, page = 1, limit = 5 } = req.query;

    const { status, status_code, message, data} = await highlightIssueService.handleGetHighlightIssue({ 
        itemName,
        page: parseInt(page),
        limit: parseInt(limit)
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Highlight Issue  ------------------- */


/* ------------------- Handle Get Highlight Issue By Id  ------------------- */

const handleGetHighlightIssueById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await highlightIssueService.handleGetHighlightIssueById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Highlight Issue By Id  ------------------- */


/* ------------------- Handle Get Metric Highlight Issue  ------------------- */

const handleGetMetricHighlightIssue = async(req, res) => {
    const { status, status_code, message, data} = await highlightIssueService.handleGetMetricHighlightIssue();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Metric Highlight Issue  ------------------- */


/* ------------------- Handle Delete Highlight Issue By Id  ------------------- */

const handleDeleteHighlightIssue = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await highlightIssueService.handleDeleteHighlightIssue({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Delete Highlight Issue By Id  ------------------- */


/* ------------------- Handle Get Notification  ------------------- */

const handleGetNotification = async(req, res) => {
    const { page = 1, limit = 4 } = req.query;

    const { status, status_code, message, data} = await highlightIssueService.handleGetNotification({
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


module.exports = {
    handleCreateHighlightIssue,
    handleGetHighlightIssue,
    handleGetHighlightIssueById,
    handleGetMetricHighlightIssue,
    handleDeleteHighlightIssue,
    handleGetNotification
}