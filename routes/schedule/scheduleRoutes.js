const express = require("express");
const router = express.Router();
const scheduleController = require("../../controllers/schedule/scheduleController");
const middleware = require("../../middlewares/auth");
const { ROLES } = require("../../libs/consts/role");

router.post('/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), scheduleController.handleCreateSchedule);
router.get('/search', middleware.authenticateAdmin, scheduleController.handleGetSchedule);
router.get('/:id', middleware.authenticateAdmin, scheduleController.handleGetScheduleById);
router.put('/update/:id', middleware.authenticateAdmin, scheduleController.handleUpdateScheduleById);
router.delete('/delete/:id', middleware.authenticateAdmin, scheduleController.handleDeleteScheduleById);

module.exports = router;