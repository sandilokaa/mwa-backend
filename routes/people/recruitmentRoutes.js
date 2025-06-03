const express = require("express");
const router = express.Router();
const recruitmentController = require("../../controllers/people/recruitmentController");
const middleware = require("../../middlewares/auth");
const { ROLES } = require("../../libs/consts/role");

router.post('/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), recruitmentController.handleCreateRecruitment);
router.get('/search', middleware.authenticateAdmin, recruitmentController.handleGetRecruitment);
router.get('/:id', middleware.authenticateAdmin, recruitmentController.handleGetRecruitmentById);
router.get('/metrics/total', middleware.authenticateAdmin, recruitmentController.handleGetMetricRecruitment);
router.delete('/delete/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), recruitmentController.handleDeleteRecruitmentById);
router.put('/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), recruitmentController.handleUpdateRecruitment);
router.get('/notification/timeline', middleware.authenticateAdmin, recruitmentController.handleGetNotification);
router.put('/progress/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), recruitmentController.handleUpdateProgressRecruitment);
router.get('/summary/stat', middleware.authenticateAdmin, recruitmentController.handleGetSummaryRecruitment);

module.exports = router;