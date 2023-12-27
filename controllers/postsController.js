const catchAsync = require("./../utils/catchAsync");
const Post = require("./../models/postModel");
const User = require("./../models/userModel");
const Follower = require("./../models/followersModel");
const AppError = require("./../utils/appError");
const { Op } = require("sequelize");

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findByPk(req.params.postID);

  if (!post) {
    return next(new AppError("No Post found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: post,
    },
  });
});

exports.getUserPosts = catchAsync(async (req, res, next) => {
  const { count, rows } = await Post.findAndCountAll({
    where: {
      userId: req.params.userID,
    },
    order: [["PostDate", "DESC"]],
  });

  if (!rows) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    count,
    data: {
      data: rows,
    },
  });
});

exports.addPost = catchAsync(async (req, res, next) => {
  const post = await req.user.createPost({
    body: req.body.body,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: post,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await findAll({
    where: {
      id: req.params.postID,
      userId: req.user.id,
    },
  })[0];

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  await post.destroy();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findAll({
    where: {
      id: req.params.postID,
      userId: req.user.id,
    },
  })[0];

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }
  const newPost = await post.update({
    body: req.body.body,
  });
  res.status(200).json({
    status: "success",
    data: {
      data: newPost,
    },
  });
});

exports.getFYP = catchAsync(async (req, res, next) => {
  const posts = await User.findAll({
    include: [
      {
        model: Follower,
        // where: {
        //   followerUserId: req.user.id,
        // },
        attributes: [],
      },
      {
        model: Post,
        attributes: ["body", "PostDate", "id"],
        where: {
          userId: {
            [Op.ne]: req.user.id,
          },
        },
      },
    ],
    attributes: ["username", "id"],
  });

  const sentPosts = posts
    .filter((obj) => obj.posts.length > 0)
    .sort(() => Math.random() - 0.5);

  res.status(200).json({
    status: "success",
    data: {
      posts: sentPosts,
    },
  });
});
