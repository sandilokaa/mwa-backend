const authService = require("../../services/user/authService");


/* ------------------- Handle Admin Login ------------------- */

const handleAdminLogin = async(req, res) => {

    const { email, password } = req.body;

    const { status, status_code, message, data} = await authService.handleAdminLogin({
        email,
        password
    });

    if (status) {
        res.cookie('token', data.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 2,
        });
    }

    res.status(status_code).send({
        status: status,
        message: message,
        data: data.role ?? null,
    });

};

/* ------------------- End Handle Admin Login ------------------- */


/* ------------------- Handle Current Login ------------------- */

const handleCurrentLogin = async(req, res) => {

    const currentUser = req.admin;

    res.status(200).send({
        status: true,
        message: "Successfully got logged in user data!",
        data: {
            currentUser: currentUser,
        }
    });

};

/* ------------------- End Handle Current Login ------------------- */


/* ------------------- Handle Admin Logout ------------------- */

const handleAdminLogout = async(req, res) => {

    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    });

    res.status(200).json({
    message: "Logout successful!",
    });

};

/* ------------------- End Handle Admin Logout ------------------- */


module.exports = { 
    handleAdminLogin, 
    handleCurrentLogin,
    handleAdminLogout
};