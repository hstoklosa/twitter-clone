const multer = require("multer");
const path = require("path");

const getMetadata = require("../helpers/metadata");
const { BadRequestError } = require("../utils/errors");

// handle file uploads
const generateFileName = (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = uniqueSuffix + path.extname(file.originalname);

    cb(null, fileName);
};

const fileFilter = (req, file, cb) => {
    const { extname, mimetype } = getMetadata(file);

    if (!extname || !mimetype) {
        return cb(new BadRequestError("Invalid file type!"));
    }

    cb(null, true);
};

// setup with 5MB file size constraint
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: generateFileName,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});

const upload = multer({
    storage: storage,
});

module.exports = upload;
