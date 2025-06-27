const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product/productController");
const middleware = require("../../middlewares/auth");
const { ROLES } = require("../../libs/consts/role");
const fileUpload = require("../../libs/utils/fileUpload");

router.get('/', middleware.authenticateAdmin, productController.handleGetProduct);
router.post('/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.single('picture'), productController.handleCreateProduct);
router.get('/:id', middleware.authenticateAdmin, productController.handleGetProductById);
router.delete('/delete/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), productController.handleDeleteProductById);
router.put('/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.single('picture'), productController.handleUpdateProductById);

module.exports = router;