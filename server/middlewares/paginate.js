const paginate = (req, res, next) => {
    const { page = 1, limit = 10 } = {
        page: parseInt(req.query.page),
        limit: parseInt(req.query.limit),
    };

    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).json({
            message: "Invalid pagination parameters",
        });
    }

    req.pagination = {
        page,
        limit,
        skip: (page - 1) * limit,
    };

    next();
};

module.exports = paginate;
