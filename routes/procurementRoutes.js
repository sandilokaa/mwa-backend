const express = require("express");
const router = express.Router();
const procurementController = require("../controllers/procurementController");
const middleware = require("../middlewares/auth");
const { ROLES } = require("../libs/consts/role");

router.post('/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), procurementController.handleCreateProcurement);
router.get('/search', middleware.authenticateAdmin, procurementController.handleGetProcurement);
router.get('/:id', middleware.authenticateAdmin, procurementController.handleGetProcurementById);
router.get('/notification/timeline', middleware.authenticateAdmin, procurementController.handleGetNotification);
router.delete('/delete/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), procurementController.handleDeleteProcurementById);
router.get('/summary/stat', middleware.authenticateAdmin, procurementController.handleGetSummaryProcurement);
router.get('/metrics/total', middleware.authenticateAdmin, procurementController.handleGetMetricProcurement);
router.put('/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), procurementController.handleUpdateProcurement);
router.put('/progress/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), procurementController.handleUpdateProgressProcurement);

module.exports = router;