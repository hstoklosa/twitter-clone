const mongoose = require("mongoose");

const paginate = async (modelName = null, pipeline = [], options = {}) => {
    const Model = mongoose.model(modelName);
    const { skip, limit } = options;

    let result = await Model.aggregate([
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

    result = result[0];

    // handle case of an empty object
    if (result.data.length === 1 && Object.keys(result.data).length === 0)
        return { data: [], totalCount: 0, totalPages: 0 };

    // handle case of no data
    if (result.data.length === 0) {
        return { data: [], totalCount: 0, totalPages: 0 };
    }

    const { data, totalCount: tempCount } = result;

    const totalCount = tempCount.length ? tempCount[0].count : 0;
    const totalPages = Math.ceil(totalCount / limit);

    return {
        data,
        totalCount,
        totalPages,
        page: skip / limit + 1,
        hasNextPage: (skip / limit + 1) < totalPages
    };
};

module.exports = paginate;
