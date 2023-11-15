const mongoose = require("mongoose");

const paginate = async (modelName = null, pipeline = [], options = {}) => {
    const Model = mongoose.model(modelName);
    const { skip, limit } = options;

    const result = await Model.aggregate([
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

    console.log(result[0]);

    // correct the data array if it contains only an empty object
    if (result[0].data.length === 1 && Object.keys(result[0].data[0]).length === 0)
        return { data: [], totalCount: 0, totalPages: 0 };

    const {
        data,
        totalCount: [{ count: totalCount }],
    } = result[0];

    const totalPages = Math.ceil(totalCount / limit);

    return {
        data,
        totalCount,
        totalPages,
    };
};

module.exports = paginate;
