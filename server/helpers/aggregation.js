exports.userLookup = [
    {
        $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
        },
    },
    {
        $unwind: {
            path: "$author",
        },
    },
];

exports.quoteLookup = [
    {
        $lookup: {
            from: "tweets",
            localField: "quoteTo",
            foreignField: "_id",
            as: "quoteTo",
        },
    },
    {
        $unwind: {
            path: "$quoteTo",
            preserveNullAndEmptyArrays: true,
        },
    },

    {
        $lookup: {
            from: "users",
            localField: "quoteTo.author",
            foreignField: "_id",
            as: "quoteTo.author",
        },
    },
    {
        $unwind: {
            path: "$quoteTo.author",
            preserveNullAndEmptyArrays: true,
        },
    },
];

exports.replyLookup = [
    {
        $lookup: {
            from: "tweets",
            localField: "replyTo",
            foreignField: "_id",
            as: "replyTo",
        },
    },
    {
        $unwind: {
            path: "$replyTo",
            preserveNullAndEmptyArrays: true,
        },
    },

    {
        $lookup: {
            from: "users",
            localField: "replyTo.author",
            foreignField: "_id",
            as: "replyTo.author",
        },
    },
    {
        $unwind: {
            path: "$replyTo.author",
            preserveNullAndEmptyArrays: true,
        },
    },
];
