const projectTargetService = require("../../../services/project/developmentStatus/projectTargetService");


/* ------------------- Handle Create Project Target  ------------------- */

const handleCreateProjectTarget = async(req, res) => {
    const userId = req.admin.id;
    
    const { 
        name,
        productId,
        projectTargetId,
        information
    } = req.body;
    
    const picturePaths = req.files['picture']?.map(file => file.path) || [];

    const { status, status_code, message, data} = await projectTargetService.handleCreateProjectTarget({
        userId,
        projectTargetId,
        productId,
        name,
        information,
        picture: picturePaths
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Create Project Target  ------------------- */


/* ------------------- Handle Get Project Target ------------------- */

const handleGetProjectTarget = async(req, res) => {

    const { productId } = req.query;

    const { status, status_code, message, data} = await projectTargetService.handleGetProjectTarget({ productId });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Project Target ------------------- */


/* ------------------- Handle Get Project Target By Id  ------------------- */

const handleGetProjectTargetById = async(req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data} = await projectTargetService.handleGetProjectTargetById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Get Project Target By Id  ------------------- */


module.exports = {
    handleCreateProjectTarget,
    handleGetProjectTarget,
    handleGetProjectTargetById
}