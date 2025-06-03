const highlightIssueService = require("../../../services/project/highlightIssue/highlightIssueService");

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

    const { productId, itemName, page = 1, limit = 5 } = req.query;

    const { status, status_code, message, data} = await highlightIssueService.handleGetHighlightIssue({ 
        productId,
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
    const { productId } = req.query;

    const { status, status_code, message, data} = await highlightIssueService.handleGetMetricHighlightIssue({ productId });

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
    const { productId, page = 1, limit = 4 } = req.query;

    const { status, status_code, message, data} = await highlightIssueService.handleGetNotification({
        productId,
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


/* ------------------- Handle Update Highlight Issue  ------------------- */

const handleUpdateHighlightIssue = async(req, res) => {
    const { id } = req.params;

    const {  
        productId,
        itemName,
        category,
        pic,
        issue,
        countermeassure,
        dueDate
    } = req.body;

    const { status, status_code, message, data} = await highlightIssueService.handleUpdateHighlightIssue({ 
        id, 
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

/* ------------------- End Handle Update Highlight Issue  ------------------- */


/* ------------------- Handle Update Status Highlight Issue  ------------------- */

const handleUpdateStatusHighlightIssue = async(req, res) => {
    const { id } = req.params;

    const { statusIssue } = req.body;

    const { status, status_code, message, data} = await highlightIssueService.handleUpdateStatusHighlightIssue({ id, statusIssue });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Update Status Highlight Issue  ------------------- */


/* ------------------- Handle Get Summary Highlight Issue  ------------------- */

const handleGetSummaryHighlightIssue = async(req, res) => {
    const { productId } = req.query;

    const { status, status_code, message, data} = await highlightIssueService.handleGetSummaryHighlightIssue({
        productId
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Summary Highlight Issue  ------------------- */


/* ------------------- Handle Revision Date Highlight Issue  ------------------- */

const handleRevisionDateHighilightIssue = async(req, res) => {
    const { id } = req.params;

    const { revisionDate, statusIssue } = req.body;

    const { status, status_code, message, data} = await highlightIssueService.handleRevisionDateHighilightIssue({
        id,
        revisionDate,
        statusIssue
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Revision Date Highlight Issue  ------------------- */


module.exports = {
    handleCreateHighlightIssue,
    handleGetHighlightIssue,
    handleGetHighlightIssueById,
    handleGetMetricHighlightIssue,
    handleDeleteHighlightIssue,
    handleGetNotification,
    handleUpdateHighlightIssue,
    handleUpdateStatusHighlightIssue,
    handleGetSummaryHighlightIssue,
    handleRevisionDateHighilightIssue
}