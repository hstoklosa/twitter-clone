const path = require("path");

const allowedTypes = /jpeg|jpg|png|gif/;

const getMetadata = (file) => {
    return {
        extname: allowedTypes.test(path.extname(file.originalname).toLowerCase()),
        mimetype: allowedTypes.test(file.mimetype),
    };
};

module.exports = getMetadata;
