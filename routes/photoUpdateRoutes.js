const express = require("express");
const router = express.Router();
const photoUpdateController = require("../controllers/photoUpdateController");
const middleware = require("../middlewares/auth");
const { ROLES } = require("../libs/consts/role");
const fileUpload = require("../libs/utils/fileUpload");

router.post('/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.single('picture'), photoUpdateController.handleCreatePhotoUpdate);
router.get('/search', middleware.authenticateAdmin, photoUpdateController.handleGetPhotoUpdate);
router.get('/:id', middleware.authenticateAdmin, photoUpdateController.handleGetPhotoUpdateById);
router.put('/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.single('picture'), photoUpdateController.handleUpdatePhotoUpdateById);
router.delete('/delete/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), photoUpdateController.handleDeletePhotoUpdateById);

module.exports = router;