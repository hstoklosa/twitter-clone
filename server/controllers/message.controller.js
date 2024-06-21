const { ObjectId } = require("mongoose").Types;

const asyncHandler = require("../middlewares/asyncHandler");
const paginate = require("../helpers/paginatePlugin");

const getMessages = asyncHandler(async (req, res, next) => {
    const { roomId } = req.params;

    const result = await paginate("Message", [
        {
            $match: {
                roomId: new ObjectId(roomId),
            }
        }
    ], req.pagination)

    return res.status(200).json(result);
});


module.exports = {
    getMessages,
};
