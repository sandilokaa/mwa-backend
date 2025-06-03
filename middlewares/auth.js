const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/user/authRepository');
const { ROLES } = require("../libs/consts/role");

const authenticateAdmin = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).send({
            status: false,
            message: "You must log in to access this resource!",
            data: null,
        });
    }

    try {
        const { email } = jwt.verify(token, process.env.SECRET);

        const getAdminByEmail = await authRepository.handleGetAdminByEmail({ email });

        req.admin = getAdminByEmail;

        next();
    } catch(err) {
        return res.status(401).send({
            status: false,
            message:"Your session has expired, please log in again!",
            data: null,
        });
    } 
};

const authorizeRole = (allowedRole) => {
    return (req, res, next) => {

        const { role } = req.admin;

        if (!role || role !== allowedRole) {
            return res.status(403).json({
                status: false,
                message: "You do not have permission to perform this section.",
                data: null,
            });
        }

        next();
    };
};

module.exports = {
    authenticateAdmin,
    authorizeRole
};