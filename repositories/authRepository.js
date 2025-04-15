const { Users } = require("../models");

class AuthRepository {

    /* ------------------- Handle Get Admin By Email ------------------- */

    static async handleGetAdminByEmail({ email }) {
        
        const getAdminByEmail = await Users.findOne({
            where : { email }
        });

        return getAdminByEmail;

    };

    /* ------------------- End Handle Get Admin By Email ------------------- */


};

module.exports = AuthRepository;