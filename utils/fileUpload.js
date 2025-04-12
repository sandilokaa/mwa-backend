const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./storages/");
    },
    filename: (req, file, cb) => {
        const [prefix] = file.mimetype.split("/");
        const filename = file.originalname.split(".");
        const extension = filename.pop();
        const fileName = `${prefix}-${Date.now()}.${extension}`;

        cb(null, fileName);

    },
});

module.exports = multer({ storage });