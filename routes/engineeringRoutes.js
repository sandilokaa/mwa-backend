const express = require("express");
const router = express.Router();
const engineeringController = require("../controllers/engineeringController");
const middleware = require("../middlewares/auth");
const fileUpload = require("../libs/utils/fileUpload");
const { ROLES } = require("../libs/consts/role");

router.post('/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.single('picture'), engineeringController.handleCreateEngineering);
router.get('/search', middleware.authenticateAdmin, engineeringController.handleGetEngineering);
router.get('/:id', middleware.authenticateAdmin, engineeringController.handleGetEngineeringById);
router.delete('/delete/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), engineeringController.handleDeleteEngineeringById);
router.get('/summary/status/stat', middleware.authenticateAdmin, engineeringController.handleGetSummaryStatusEngineering);
router.put('/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.single('picture'), engineeringController.handleUpdateEngineeringById);
router.put('/status/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), engineeringController.handleUpdateStatusEngineering);

module.exports = router;