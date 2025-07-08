const authRepository = require("../../repositories/user/authRepository");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {

    /* ------------------- Handle Admin Login ------------------- */

    static async handleAdminLogin({ email, password }){

        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Email is required!",
                    data: {
                        adminLogin: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password is required!",
                    data: {
                        adminLogin: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Admin password is at least 8 characters long!",
                    data: {
                        adminLogin: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //


            const getAdminByEmail = await authRepository.handleGetAdminByEmail({ email });

            if (!getAdminByEmail) {
                return {
                    status: false,
                    status_code: 404,
                    message: "Email not registered ):",
                    data: {
                        adminLogin: null,
                    },
                };
            } else {

                const isPasswordMatch = await bcrypt.compare(password, getAdminByEmail.password);

                if (isPasswordMatch) {

                    const token = jwt.sign({
                        id: getAdminByEmail.id,
                        email: getAdminByEmail.email,
                        role: getAdminByEmail.role
                    },
                        process.env.SECRET,
                        {
                            expiresIn: process.env.EXPIRED,
                        });

                    return {
                        status: true,
                        status_code: 201,
                        message: "Admin login successfully!",
                        data: {
                            token,
                            id: getAdminByEmail.id,
                            email: getAdminByEmail.email,
                            role:getAdminByEmail.role
                        },
                    };

                } else {

                    return {
                        status: false,
                        status_code: 400,
                        message: "Your email or password is incorrect!",
                        data: {
                            adminLogin: null,
                        },
                    };

                }
            }

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    adminLogin: null,
                },
            };

        }

    };

    /* ------------------- End Handle Admin Login ------------------- */

};

module.exports = AuthService;