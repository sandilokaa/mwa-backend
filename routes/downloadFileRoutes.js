const express = require("express");
const router = express.Router();
const downloadFileController = require("../controllers/downloadFileController");
const middleware = require("../middlewares/auth");

router.get('/*', middleware.authenticateAdmin, downloadFileController.handleDownloadFile);

module.exports = router;