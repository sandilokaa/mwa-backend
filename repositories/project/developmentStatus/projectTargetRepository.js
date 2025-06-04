const { ProjectTargets, ProjectTargetImages, Products } = require("../../../models");

class ProjectTargetRepository {

    /* ------------------- Handle Create Project Target ------------------- */

    static async handleCreateProjectTarget ({
        userId,
        productId,
        name,
        information
    }) {
        const projectTargetCreated = await ProjectTargets.create({
            userId,
            productId,
            name,
            information
        });
        return projectTargetCreated;
    };

    /* ------------------- End Handle Create Project Target ------------------- */


    /* ------------------- Handle Create Project Target ------------------- */

    static async handleCreateProjectTargetImages ({
        projectTargetId,
        picture
    }) {
        const imageData = picture.map((imgPath) => ({
            projectTargetId,
            picture: imgPath
        }));

        const projectTargetImageCreated = await ProjectTargetImages.bulkCreate(imageData);

        return projectTargetImageCreated;
    };

    /* ------------------- End Handle Create Project Target Images  ------------------- */


    /* ------------------- Handle Get Project Target  ------------------- */

    static async handleGetProjectTarget({ productId }) {
        const query = {
            where: {},
            attributes: [
                'id',
                'productId',
                'name',
                'information'
            ],
            include: [
                {
                    model: Products,
                    attributes: ['id'],
                    where: { id: productId }
                },
                {
                    model: ProjectTargetImages,
                    attributes: ['picture'],
                    limit: 1
                }
            ],
        };

        const getProjectTarget = await ProjectTargets.findAll(query);

        return getProjectTarget;
    };

    /* ------------------- End Handle Get Project Target  ------------------- */


    /* ------------------- Handle Get Project Target By Id  ------------------- */

    static async handleGetProjectTargetById({ id }) {
        const query = {
            where: { id },
            attributes: [
                'id',
                'productId',
                'name',
                'information'
            ],
            include: [
                {
                    model: ProjectTargetImages,
                    attributes: ['id', 'stylingDesignId', 'picture']
                }
            ],
        };
        
        const getProjectTargetById = await ProjectTargets.findOne(query);

        return getProjectTargetById;
    };

    /* ------------------- End Handle Get Project Target By Id  ------------------- */

};

module.exports = ProjectTargetRepository;