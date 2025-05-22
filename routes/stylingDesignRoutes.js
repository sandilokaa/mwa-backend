const express = require("express");
const router = express.Router();
const stylingDesignController = require("../controllers/stylingDesignController");
const middleware = require("../middlewares/auth");
const fileUpload = require("../libs/utils/fileUpload");
const { ROLES } = require("../libs/consts/role");

router.post('/api/v1/styling-designs/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.array('picture', 10), stylingDesignController.handleCreateStylingDesign);
router.get('/api/v1/styling-designs/search', middleware.authenticateAdmin, stylingDesignController.handleGetStylingDesign);
router.get('/api/v1/styling-designs/:id', middleware.authenticateAdmin, stylingDesignController.handleGetStylingDesignById);

module.exports = router;