const paginate = async (model, pipeline = [], options = {}) => {
    const { skip, limit } = options;

    const result = await model.aggregate([
        ...pipeline,
        {
            $sort: { createdAt: -1 },
        },
        {
            $facet: {
                data: [{ $skip: skip }, { $limit: limit }],
                totalCount: [{ $count: "count" }],
            },
        },
    ]);

    const totalCount = result[0]?.totalCount.length ? result[0]?.totalCount[0]?.count : 0;

    result[0].totalCount = totalCount;
    result[0].totalPages = totalCount ? Math.ceil(totalCount / limit) : 0;

    return result[0];
};

module.exports = paginate;
