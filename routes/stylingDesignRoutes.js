const express = require("express");
const router = express.Router();
const stylingDesignController = require("../controllers/stylingDesignController");
const middleware = require("../middlewares/auth");
const fileUpload = require("../libs/utils/fileUpload");
const { ROLES } = require("../libs/consts/role");

router.post('/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.fields([{ name: 'picture', maxCount: 10 }]), stylingDesignController.handleCreateStylingDesign);
router.get('/search', middleware.authenticateAdmin, stylingDesignController.handleGetStylingDesign);
router.get('/:id', middleware.authenticateAdmin, stylingDesignController.handleGetStylingDesignById);
router.put('/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.fields([{ name: 'picture', maxCount: 10 }, { name: 'updatedImage', maxCount: 10 }]), stylingDesignController.handleUpdateStylingDesignById);

module.exports = router;