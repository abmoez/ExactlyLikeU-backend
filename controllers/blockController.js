const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");
const Blocked = require("./../models/blockedModel");
const AppError = require("./../utils/appError");

exports.block = catchAsync(async (req, res, next) => {
  const { userID } = req.params;

  // Check if the user to be blocked exists
  const blockedUser = await User.findByPk(userID);
  if (!blockedUser) {
    return next(new AppError("User not found", 404));
  }

  // Check if the user is already blocked
  const isBlocked = await Blocked.findOne({
    where: {
      userId: req.user.id,
      blockedUserId: userID,
    },
  });

  // If already blocked, you might want to skip creating another block
  if (isBlocked) {
    return res.status(200).json({
      status: "success",
      message: "User is already blocked",
    });
  }

  // Delete any existing blocks from the current user to the user being blocked
  await Blocked.destroy({
    where: {
      userId: req.user.id,
      blockedUserId: userID,
    },
  });

  // Create a new block relationship
  const blocked = await Blocked.create({
    userId: req.user.id,
    blockedUserId: userID,
  });

  res.status(200).json({
    status: "success",
    data: {
      blocked,
    },
  });
});

exports.unblock = catchAsync(async (req, res, next) => {
  const { userID } = req.params;

  // Check if the user to be blocked exists
  const blockedUser = await User.findByPk(userID);
  if (!blockedUser) {
    return next(new AppError("User not found", 404));
  }
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

// 
exports.getBlockList = catchAsync(async (req, res, next) => {
    const { userID } = req.params;
  
    const blockedUsers = await Blocked.findAll({
      where: {
        userId: userID,
      },
      include: [
        {
          model: User,
          attributes: [], // Exclude user attributes from the query
        },
      ],
    });
  
    res.status(200).json({
      status: 'success',
      count: blockedUsers.length,
      data: blockedUsers,
    });
  });
  
  
  
