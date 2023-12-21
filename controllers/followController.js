const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");
const Following = require("./../models/followingModel");
const Follower = require("./../models/followersModel");

exports.follow = catchAsync(async (req, res, next) => {
  const following = await req.user.createFollowing({
    followingUserId: req.params.userID,
  });
  if (!following) {
    return next(new AppError("User not found", 404));
  }
  const follower = await Follower.create({
    followerUserId: req.user.id,
    userId: req.params.userID,
  });
  res.status(200).json({
    status: "success",
    data: {
      data: following,
    },
  });
});

exports.unfollow = catchAsync(async (req, res, next) => {
  await Following.destroy({
    where: {
      userId: req.user.id,
      followingUserId: req.params.userID,
    },
  });

  await Follower.destroy({
    where: {
      followerUserId: req.user.id,
      userId: req.params.userID,
    },
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.removefollower = catchAsync(async (req, res, next) => {
  await Following.destroy({
    where: {
      userId: req.params.userID,
      followingUserId: req.user.id,
    },
  });

  await Follower.destroy({
    where: {
      followerUserId: req.params.userID,
      userId: req.user.id,
    },
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.getFollowings = catchAsync(async (req, res, next) => {
  const { count, rows } = await Following.findAndCountAll({
    where: {
      userId: req.params.userID,
    },
  });
  res.status(200).json({
    status: "success",
    count,
    data: rows,
  });
});

exports.getFollowers = catchAsync(async (req, res, next) => {
  const { count, rows } = await Follower.findAndCountAll({
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
