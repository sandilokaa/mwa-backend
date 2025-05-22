const express = require("express");
const router = express.Router();
const stylingDesignController = require("../controllers/stylingDesignController");
const middleware = require("../middlewares/auth");
const fileUpload = require("../libs/utils/fileUpload");
const { ROLES } = require("../libs/consts/role");

router.post('/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.array('picture', 10), stylingDesignController.handleCreateStylingDesign);
router.get('/search', middleware.authenticateAdmin, stylingDesignController.handleGetStylingDesign);
router.get('/:id', middleware.authenticateAdmin, stylingDesignController.handleGetStylingDesignById);

module.exports = router;