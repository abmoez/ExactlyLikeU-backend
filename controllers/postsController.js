const catchAsync = require("./../utils/catchAsync");
const Post = require("./../models/postModel");

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
  const posts = await Post.findAll({
    where: {
      userId: req.params.userID,
    },
  });

  if (!posts) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: posts,
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
  const post = await Post.findByPk(req.params.postID);

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
  const post = await Post.findByPk(req.params.postID);

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
