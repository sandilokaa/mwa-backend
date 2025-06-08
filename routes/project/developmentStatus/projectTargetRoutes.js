const express = require("express");
const router = express.Router();
const projectTargetController = require("../../../controllers/project/developmentStatus/projectTargetController");
const middleware = require("../../../middlewares/auth");
const fileUpload = require("../../../libs/utils/fileUpload");
const { ROLES } = require("../../../libs/consts/role");

router.post('/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.fields([{ name: 'picture', maxCount: 10 }]), projectTargetController.handleCreateProjectTarget);
router.get('/search', middleware.authenticateAdmin, projectTargetController.handleGetProjectTarget);
router.get('/:id', middleware.authenticateAdmin, projectTargetController.handleGetProjectTargetById);
router.put('/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.fields([{ name: 'picture', maxCount: 10 }, { name: 'updatedImage', maxCount: 10 }]), projectTargetController.handleUpdateProjectTargetById);

module.exports = router;