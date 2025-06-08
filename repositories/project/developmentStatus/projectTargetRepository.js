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
                    attributes: ['id', 'projectTargetId', 'picture']
                }
            ],
        };
        
        const getProjectTargetById = await ProjectTargets.findOne(query);

        return getProjectTargetById;
    };

    /* ------------------- End Handle Get Project Target By Id  ------------------- */


    /* ------------------- Handle Get Project Target Image By Id  ------------------- */

    static async handleGetProjectTargetImageById({ imageId }) {
        const query = {
            where: { id: imageId },
            attributes: [
                'id',
                'projectTargetId',
                'picture',
            ],
        };
        
        const getProjectTargetImageById = await ProjectTargetImages.findOne(query);

        return getProjectTargetImageById;
    };

    /* ------------------- End Handle Get Project Target Image By Id  ------------------- */


    /* ------------------- Handle Update Project Target Image By Id  ------------------- */

    static async handleUpdateProjectTargetById({
        id,
        productId,
        name,
        information
    }) {
        const updatedProjectTarget = await ProjectTargets.update({
            productId,
            name,
            information
        }, {
            where: { id }
        });

        return updatedProjectTarget;
    };

    /* ------------------- End Handle Update Project Target Image By Id  ------------------- */


    /* ------------------- Handle Delete Project Target Image By Id  ------------------- */

    static async handleDeleteProjectTargetImageById({ imageId }) {
        const deletedProjectTargetImage = await ProjectTargetImages.destroy({ where: { id: imageId } });

        return deletedProjectTargetImage;
    };

    /* ------------------- End Handle Delete Project Target Image By Id  ------------------- */


    /* ------------------- Handle Update Project Target Image By Id  ------------------- */

    static async handleUpdateProjectTargetImageById({
        picture,
        imageId,
    }) {
        const updatedProjectTargetImage = await ProjectTargetImages.update({
            picture,
        }, {
            where: { id: imageId }
        });

        return updatedProjectTargetImage;
    };

    /* ------------------- End Handle Update Project Target Image By Id  ------------------- */

};

module.exports = ProjectTargetRepository;