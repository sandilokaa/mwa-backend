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
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/products", require("./routes/productRoutes"));
app.use("/api/v1/procurements", require("./routes/procurementRoutes"));
app.use("/api/v1/recruitments", require("./routes/recruitmentRoutes"));
app.use("/api/v1/highlight-issues", require("./routes/highlightIssueRoutes"));
app.use("/api/v1/engineerings", require("./routes/engineeringRoutes"));
app.use("/api/v1/productions", require("./routes/productionRoutes"));
app.use("/api/v1/styling-designs", require("./routes/stylingDesignRoutes"));
app.use("/api/v1/part-designs", require("./routes/partDesignRoutes"));

// Start updaters
startProcurementStatusUpdater();
startRecruitmentStatusUpdater();
startIssueStatusUpdater();

module.exports = app;