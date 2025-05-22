const express = require("express");
const router = express.Router();
const partDesignController = require("../controllers/partDesignController");
const middleware = require("../middlewares/auth");
const { ROLES } = require("../libs/consts/role");
const fileUpload = require("../libs/utils/fileUpload");

router.post('/api/v1/part-designs/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.single('picture'), partDesignController.handleCreatePartDesign);
router.get('/api/v1/part-designs/search', middleware.authenticateAdmin, partDesignController.handleGetPartDesign);
router.get('/api/v1/part-designs/:id', middleware.authenticateAdmin, partDesignController.handleGetPartDesignById);
router.delete('/api/v1/part-designs/delete/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), partDesignController.handleDeletePartDesignById);
router.put('/api/v1/part-designs/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.single('picture'), partDesignController.handleUpdatePartDesignById);

module.exports = router;