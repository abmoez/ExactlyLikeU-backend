const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");
const Blocked = require("./../models/blockedModel");

exports.block = catchAsync(async (req, res, next) => {
    const blocked = await req.user.createBlocked({
      blockedUserId: req.params.userID,
    });
    if (!blocked) {
      return next(new AppError("User not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: blocked,
      },
    });
  
});

exports.unblock = catchAsync(async (req, res, next) => {
    await Blocked.destroy({
      where: {
        userId: req.user.id,
        blockedUserId: req.params.userID,
      },
    });
    res.status(204).json({
        status: "success",
        data: null,
      });
});

exports.getblockList = catchAsync(async (req, res, next) => {
    const { count, rows } = await Blocked.findAndCountAll({
        where: {
          userId: req.params.userID,
        },
        include: [
          {
            model: User,
          },
        ],
      });
      res.status(200).json({
        status: "success",
        count,
        data: rows,
      });
});