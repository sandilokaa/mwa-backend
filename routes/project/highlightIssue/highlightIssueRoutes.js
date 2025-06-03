const express = require("express");
const router = express.Router();
const highlightIssueController = require("../../../controllers/project/highlightIssue/highlightIssueController");
const middleware = require("../../../middlewares/auth");
const { ROLES } = require("../../../libs/consts/role");

router.post('/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), highlightIssueController.handleCreateHighlightIssue);
router.get('/search', middleware.authenticateAdmin, highlightIssueController.handleGetHighlightIssue);
router.get('/:id', middleware.authenticateAdmin, highlightIssueController.handleGetHighlightIssueById);
router.get('/metrics/total', middleware.authenticateAdmin, highlightIssueController.handleGetMetricHighlightIssue);
router.delete('/delete/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), highlightIssueController.handleDeleteHighlightIssue);
router.get('/notification/timeline', middleware.authenticateAdmin, highlightIssueController.handleGetNotification);
router.put('/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), highlightIssueController.handleUpdateHighlightIssue);
router.put('/status/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), highlightIssueController.handleUpdateStatusHighlightIssue);
router.get('/summary/stat', middleware.authenticateAdmin, highlightIssueController.handleGetSummaryHighlightIssue);
router.put('/revision/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), highlightIssueController.handleRevisionDateHighilightIssue);

module.exports = router;