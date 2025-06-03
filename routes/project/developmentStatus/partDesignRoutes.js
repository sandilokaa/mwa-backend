const express = require("express");
const router = express.Router();
const partDesignController = require("../../../controllers/project/developmentStatus/partDesignController");
const middleware = require("../../../middlewares/auth");
const { ROLES } = require("../../../libs/consts/role");
const fileUpload = require("../../../libs/utils/fileUpload");

router.post('/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.single('picture'), partDesignController.handleCreatePartDesign);
router.get('/search', middleware.authenticateAdmin, partDesignController.handleGetPartDesign);
router.get('/:id', middleware.authenticateAdmin, partDesignController.handleGetPartDesignById);
router.delete('/delete/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), partDesignController.handleDeletePartDesignById);
router.put('/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.single('picture'), partDesignController.handleUpdatePartDesignById);

module.exports = router;