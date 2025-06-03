const express = require("express");
const router = express.Router();
const authController = require("../../controllers/user/authController");
const middleware = require("../../middlewares/auth");

router.post('/session/login', authController.handleAdminLogin);
router.get('/session/me', middleware.authenticateAdmin, authController.handleCurrentLogin);
router.post('/session/logout', authController.handleAdminLogout);

module.exports = router;