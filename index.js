const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');
const fileUpload = require("./utils/fileUpload");
const { ROLES } = require("./libs/role");

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


// ------------------------- End Define Routes ------------------------- //


// ------------------------- Server Listen ------------------------- //

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT http://localhost:${PORT}`);
});

// ------------------------- End Server Listen ------------------------- //

module.exports = app;