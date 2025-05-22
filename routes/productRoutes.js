const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const middleware = require("../middlewares/auth");

router.get('/', middleware.authenticateAdmin, productController.handleGetProduct);

module.exports = router;