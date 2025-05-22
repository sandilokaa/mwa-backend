const express = require("express");
const router = express.Router();
const productionController = require("../controllers/productionController");
const middleware = require("../middlewares/auth");
const { ROLES } = require("../libs/consts/role");

router.get('/search', middleware.authenticateAdmin, productionController.handleGetProduction);
router.get('/:id', middleware.authenticateAdmin, productionController.handleGetProductionById);
router.put('/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), productionController.handleUpdateProductionById);
router.put('/status/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), productionController.handleUpdateStatusProduction);
router.get('/summary/status/stat', middleware.authenticateAdmin, productionController.handleGetSummaryStatusProduction);

module.exports = router;