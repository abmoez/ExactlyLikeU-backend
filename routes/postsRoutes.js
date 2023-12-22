const express = require("express");
const postsController = require("./../controllers/postsController");
const authController = require("./../controllers/authController");

const router = express();

// Create a new post POST
router.route("/").post(authController.protect, postsController.addPost);

// get posts - user dependent GET
router.route("/").get(authController.protect, postsController.getFYP);

// Get A post , update post, delete post
router
  .route("/:postID")
  .get(authController.protect, postsController.getPost)
  .patch(authController.protect, postsController.updatePost)
  .delete(authController.protect, postsController.deletePost);

// get posts (profile) GET :userID
router.route("/users/:userID").get(postsController.getUserPosts);

// get trends GET

module.exports = router;
