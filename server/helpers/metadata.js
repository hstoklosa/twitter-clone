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

module.exports = getMetadata;
