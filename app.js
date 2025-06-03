const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const { startIssueStatusUpdater } = require("./libs/utils/issueStatusUpdate");
const { startRecruitmentStatusUpdater } = require("./libs/utils/recruitmentStatusUpdate");
const { startProcurementStatusUpdater } = require("./libs/utils/procurementStatusUpdater");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}));

// Static file
app.use("/storages", express.static(path.join(__dirname, "storages")));


// Register all routes
app.use("/api/v1/auth", require("./routes/user/authRoutes"));
app.use("/api/v1/products", require("./routes/project/product/productRoutes"));
app.use("/api/v1/procurements", require("./routes/project/developmentStatus/procurementRoutes"));
app.use("/api/v1/recruitments", require("./routes/people/recruitmentRoutes"));
app.use("/api/v1/highlight-issues", require("./routes/project/highlightIssue/highlightIssueRoutes"));
app.use("/api/v1/engineerings", require("./routes/project/developmentStatus/engineeringRoutes"));
app.use("/api/v1/productions", require("./routes/project/developmentStatus/productionRoutes"));
app.use("/api/v1/styling-designs", require("./routes/project/developmentStatus/stylingDesignRoutes"));
app.use("/api/v1/part-designs", require("./routes/project/developmentStatus/partDesignRoutes"));
app.use("/api/v1/photo-updates", require("./routes/project/photoUpdate/photoUpdateRoutes"));
app.use("/api/v1/download", require("./routes/user/downloadFileRoutes"));

// Start updaters
startProcurementStatusUpdater();
startRecruitmentStatusUpdater();
startIssueStatusUpdater();

module.exports = app;