const fs = require("fs-extra");

const fileRemove = async(pathFile) => {

    try {
        
        await fs.remove(pathFile);

    } catch (err) {
        
        console.log(err)

    }

};

module.exports = fileRemove;