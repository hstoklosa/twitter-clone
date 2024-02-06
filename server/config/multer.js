const multer = require("multer");
const path = require("path");
const { BadRequestError } = require("../utils/errors");


// handle file uploads
const generateFileName = (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = uniqueSuffix + path.extname(file.originalname);

    cb(null, fileName);
};

const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const mimetype = file.mimetype;

    if (!extname || !mimetype) {
        return cb(new BadRequestError("Invalid file type!"));
    }

    if (extname !== '.png' && extname !== '.jpg' && extname !== '.gif' && extname !== '.jpeg') {
        return cb(new BadRequestError('Only images are allowed'))
    }

    cb(null, true);
};

// setup with 5MB file size constraint
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: generateFileName,
});

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});

module.exports = upload;
