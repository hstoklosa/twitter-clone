const { BadRequest } = require("../utils/errors");

const paginate = (req, res, next) => {
    const options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
    };

    options.skip = (options.page - 1) * options.limit;
    // options.sortBy = req.query.sortBy || "createdAt:desc";

    if (isNaN(options.page) || isNaN(options.limit))
        return next(new BadRequest("Invalid pagination parameters"));

    req.pagination = options;
    next();
};

module.exports = paginate;
