const { ObjectId } = require("mongoose").Types;

const asyncHandler = require("../middlewares/asyncHandler");
const paginate = require("../helpers/paginatePlugin");


const getRooms = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    const result = await paginate("Room", [
        {
            $match: {
                participants: { $in: [new ObjectId(userId)] },
            }
        }
    ], req.pagination)

    return res.status(200).json(result);
});


module.exports = {
    getRooms,
};
