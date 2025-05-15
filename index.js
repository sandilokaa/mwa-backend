const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');
const fileUpload = require("./libs/utils/fileUpload");
const { ROLES } = require("./libs/consts/role");
const { startProcurementStatusUpdater } = require ("./libs/utils/procurementStatusUpdater");
const { startRecruitmentStatusUpdater } = require("./libs/utils/recruitmentStatusUpdate");
const { startIssueStatusUpdater } = require("./libs/utils/issueStatusUpdate");

const app = express();
const PORT = process.env.PORT || 8080;

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}));


// ------------------------- Public File Access ------------------------- //

app.use("/storages", express.static(path.join(__dirname, "storages")));

// ------------------------- End Public File Access ------------------------- //



// ------------------------- Import Controllers ------------------------- //

const authController = require("./controllers/authController");
const photoUpdateController = require("./controllers/photoUpdateController");
const productController = require("./controllers/productController");
const procurementController = require("./controllers/procurementController");
const recruitmentController = require("./controllers/recruitmentController");
const highlightIssueController = require("./controllers/highlightIssueController");
const engineeringController = require("./controllers/engineeringController");
const productionController = require("./controllers/productionController");
const stylingDesignController = require("./controllers/stylingDesignController");

// ------------------------- End Import Controllers ------------------------- //



// ------------------------- Import middlewares ------------------------- //

const middleware = require("./middlewares/auth");

// ------------------------- End Import middlewares ------------------------- //



// ------------------------- Define Routes ------------------------- //


/* -------------- Auth Endpoint -------------- */

app.post('/api/v1/auth/session/login', authController.handleAdminLogin);
app.get('/api/v1/auth/session/me', middleware.authenticateAdmin, authController.handleCurrentLogin);
app.post('/api/v1/auth/session/logout', authController.handleAdminLogout);

/* -------------- End Auth Endpoint -------------- */


/* -------------- Product Endpoint -------------- */

app.get('/api/v1/products', middleware.authenticateAdmin, productController.handleGetProduct);

/* -------------- End Product Endpoint -------------- */


/* -------------- Photo Update Endpoint -------------- */

app.post('/api/v1/photo-updates/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.single('picture'), photoUpdateController.handleCreatePhotoUpdate);
app.get('/api/v1/photo-updates/search', middleware.authenticateAdmin, photoUpdateController.handleGetPhotoUpdate);
app.get('/api/v1/photo-updates/:id', middleware.authenticateAdmin, photoUpdateController.handleGetPhotoUpdateById);
app.put('/api/v1/photo-updates/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.single('picture'), photoUpdateController.handleUpdatePhotoUpdateById);
app.delete('/api/v1/photo-updates/delete/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), photoUpdateController.handleDeletePhotoUpdateById);

/* -------------- End Photo Update Endpoint -------------- */


/* -------------- Procurement Status Endpoint -------------- */

app.post('/api/v1/procurements/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), procurementController.handleCreateProcurement);
app.get('/api/v1/procurements/search', middleware.authenticateAdmin, procurementController.handleGetProcurement);
app.get('/api/v1/procurements/:id', middleware.authenticateAdmin, procurementController.handleGetProcurementById);
app.get('/api/v1/procurements/notification/timeline', middleware.authenticateAdmin, procurementController.handleGetNotification);
app.delete('/api/v1/procurements/delete/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), procurementController.handleDeleteProcurementById);
app.get('/api/v1/procurements/summary/stat', middleware.authenticateAdmin, procurementController.handleGetSummaryProcurement);
app.get('/api/v1/procurements/metrics/total', middleware.authenticateAdmin, procurementController.handleGetMetricProcurement);
app.put('/api/v1/procurements/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), procurementController.handleUpdateProcurement);
app.put('/api/v1/procurements/progress/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), procurementController.handleUpdateProgressProcurement);
startProcurementStatusUpdater();

/* -------------- End Procurement Status Endpoint -------------- */


/* -------------- Recruitment Endpoint -------------- */

app.post('/api/v1/recruitments/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), recruitmentController.handleCreateRecruitment);
app.get('/api/v1/recruitments/search', middleware.authenticateAdmin, recruitmentController.handleGetRecruitment);
app.get('/api/v1/recruitments/:id', middleware.authenticateAdmin, recruitmentController.handleGetRecruitmentById);
app.get('/api/v1/recruitments/metrics/total', middleware.authenticateAdmin, recruitmentController.handleGetMetricRecruitment);
app.delete('/api/v1/recruitments/delete/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), recruitmentController.handleDeleteRecruitmentById);
app.put('/api/v1/recruitments/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), recruitmentController.handleUpdateRecruitment);
app.get('/api/v1/recruitments/notification/timeline', middleware.authenticateAdmin, recruitmentController.handleGetNotification);
app.put('/api/v1/recruitments/progress/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), recruitmentController.handleUpdateProgressRecruitment);
app.get('/api/v1/recruitments/summary/stat', middleware.authenticateAdmin, recruitmentController.handleGetSummaryRecruitment);
startRecruitmentStatusUpdater();

/* -------------- End Recruitment Endpoint -------------- */


/* -------------- Highlight Issue Endpoint -------------- */

app.post('/api/v1/highlight-issues/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), highlightIssueController.handleCreateHighlightIssue);
app.get('/api/v1/highlight-issues/search', middleware.authenticateAdmin, highlightIssueController.handleGetHighlightIssue);
app.get('/api/v1/highlight-issues/:id', middleware.authenticateAdmin, highlightIssueController.handleGetHighlightIssueById);
app.get('/api/v1/highlight-issues/metrics/total', middleware.authenticateAdmin, highlightIssueController.handleGetMetricHighlightIssue);
app.delete('/api/v1/highlight-issues/delete/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), highlightIssueController.handleDeleteHighlightIssue);
app.get('/api/v1/highlight-issues/notification/timeline', middleware.authenticateAdmin, highlightIssueController.handleGetNotification);
app.put('/api/v1/highlight-issues/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), highlightIssueController.handleUpdateHighlightIssue);
app.put('/api/v1/highlight-issues/status/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), highlightIssueController.handleUpdateStatusHighlightIssue);
app.get('/api/v1/highlight-issues/summary/stat', middleware.authenticateAdmin, highlightIssueController.handleGetSummaryHighlightIssue);
app.put('/api/v1/highlight-issues/revision/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), highlightIssueController.handleRevisionDateHighilightIssue);
startIssueStatusUpdater();

/* -------------- End Highlight Issue Endpoint -------------- */


/* -------------- Engineering Endpoint -------------- */

app.post('/api/v1/engineerings/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.single('picture'), engineeringController.handleCreateEngineering);
app.get('/api/v1/engineerings/search', middleware.authenticateAdmin, engineeringController.handleGetEngineering);
app.get('/api/v1/engineerings/:id', middleware.authenticateAdmin, engineeringController.handleGetEngineeringById);
app.delete('/api/v1/engineerings/delete/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), engineeringController.handleDeleteEngineeringById);
app.get('/api/v1/engineerings/summary/status/stat', middleware.authenticateAdmin, engineeringController.handleGetSummaryStatusEngineering);
app.put('/api/v1/engineerings/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.single('picture'), engineeringController.handleUpdateEngineeringById);
app.put('/api/v1/engineerings/status/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), engineeringController.handleUpdateStatusEngineering);

/* -------------- End Engineering Endpoint -------------- */


/* -------------- Production Endpoint -------------- */

app.get('/api/v1/productions/search', middleware.authenticateAdmin, productionController.handleGetProduction);
app.get('/api/v1/productions/:id', middleware.authenticateAdmin, productionController.handleGetProductionById);
app.put('/api/v1/productions/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), productionController.handleUpdateProductionById);
app.put('/api/v1/productions/status/update/:id', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), productionController.handleUpdateStatusProduction);
app.get('/api/v1/productions/summary/status/stat', middleware.authenticateAdmin, productionController.handleGetSummaryStatusProduction);

/* -------------- End Production Endpoint -------------- */


/* -------------- Styling Design Endpoint -------------- */

app.post('/api/v1/styling-designs/create', middleware.authenticateAdmin, middleware.authorizeRole(ROLES.RNE), fileUpload.array('picture', 10), stylingDesignController.handleCreateStylingDesign);
app.get('/api/v1/styling-designs/search', middleware.authenticateAdmin, stylingDesignController.handleGetStylingDesign);

/* -------------- End Styling Design Endpoint -------------- */


// ------------------------- End Define Routes ------------------------- //


// ------------------------- Server Listen ------------------------- //

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT http://localhost:${PORT}`);
});

// ------------------------- End Server Listen ------------------------- //

module.exports = app;