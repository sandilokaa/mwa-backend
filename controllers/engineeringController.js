const engineeringService = require("../services/engineeringService");

/* ------------------- Handle Create Engineering  ------------------- */

const handleCreateEngineering = async(req, res) => {
    const userId = req.admin.id;

    let engineFile = "";

    if (req.file) {
        engineFile = req.file.path;
    }

    const { 
        productId,  
        engineeringId,
        partName,
        drawingNumber,
        category,
        pic3D,
        pic2DDXF,
        startDate,
        dateRequired,
        price,
        quantity,
        totalPrice,
        remark,
        prodFile
    } = req.body;

    const { status, status_code, message, data} = await engineeringService.handleCreateEngineering({
        userId,
        productId,
        engineeringId,
        partName,
        drawingNumber,
        category,
        pic3D,
        pic2DDXF,
        startDate,
        dateRequired,
        price,
        quantity,
        totalPrice,
        remark,
        prodFile,
        engineFile
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

/* ------------------- End Handle Create Engineering  ------------------- */

module.exports = {
    handleCreateEngineering
}