const { Engineerings } = require("../models");

class EngineeringRepository {

    /* ------------------- Handle Create Engineering  ------------------- */

    static async handleCreateEngineering ({
        userId,
        productId,
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
        engineFile
    }) {
        const engineeringCreated = await Engineerings.create({
            userId,
            productId,
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
            engineFile
        });

        return engineeringCreated;
    };

    /* ------------------- End Handle Create Engineering  ------------------- */

};

module.exports = EngineeringRepository;