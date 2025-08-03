const express = require("express");
const router = express.Router();
const budgetStatusUsageController = require("../../../controllers/project/budgetStatus/budgetStatusUsageController");
const budgetStatusLimitController = require("../../../controllers/project/budgetStatus/budgetStatusLimitController");
const middleware = require("../../../middlewares/auth");
const { ROLES } = require("../../../libs/consts/role");

router.post('/create/limit', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), budgetStatusLimitController.handleCreateBudgetStatusLimit);
router.get('/search/limit', middleware.authenticateAdmin, budgetStatusLimitController.handleGetAllBudgetStatusLimit);
router.put('/update/limit/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), budgetStatusLimitController.handleUpdateBudgetStatusLimit);
router.delete('/delete/limit/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), budgetStatusLimitController.handleDeleteBudgetStatusLimit);
router.get('/limit/:id', middleware.authenticateAdmin, budgetStatusLimitController.handleGetBudgetStatusLimitById);

router.post('/create/usage', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), budgetStatusUsageController.handleCreateBudgetStatusUsage);
router.get('/search/usage', middleware.authenticateAdmin, budgetStatusUsageController.handleGetAllBudgetStatusUsage);
router.get('/usage/:id', middleware.authenticateAdmin, budgetStatusUsageController.handleGetBudgetStatusUsageById);
router.delete('/delete/usage/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), budgetStatusUsageController.handleDeleteBudgetStatusUsage);
router.put('/update/usage/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), budgetStatusUsageController.handleUpdateBudgetStatusUsage);

module.exports = router;