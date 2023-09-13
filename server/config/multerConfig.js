const multer = require("multer");
const path = require("path");

const imageTypes = /jpeg|jpg|png|gif/;

const getMetadata = (file) => {
    const extname = imageTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = imageTypes.test(file.mimetype);

    return {
        extname,
        mimetype,
    };
};

// Handle file uploads

const generateFileName = (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = uniqueSuffix + path.extname(file.originalname);

    cb(null, fileName);
};

const fileFilter = (req, file, cb) => {
    const { extname, mimetype } = getMetadata(file);

    if (extname && mimetype) {
        return cb(null, true);
    }

    return cb(new Error("Invalid file type!"));
};

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: generateFileName,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // restrict file size to 5MB
    },
});

const upload = multer({
    storage: storage,
});

module.exports = upload;
