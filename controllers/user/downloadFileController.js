const path = require("path");
const fs = require("fs");

/* ------------------- Handle Download File  ------------------- */

const handleDownloadFile = async(req, res) => {
    const filename = req.params[0];
    const filePath = path.resolve(__dirname, "../../", filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found");
    }

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_ORIGIN);
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(500).send("Failed to download file");
        }
    });
};

/* ------------------- End Handle Download File  ------------------- */

module.exports = { handleDownloadFile }