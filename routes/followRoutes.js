const express = require("express");
const followController = require("./../controllers/followController");
const authController = require("./../controllers/authController");

const router = express();

// follow, unfollow
router
  .route("/:userID")
  .post(authController.protect, followController.follow)
  .delete(authController.protect, followController.unfollow);

// remove follower
router
  .route("/remove/:userID")
  .delete(authController.protect, followController.removefollower);

// get followings and followers
router.route("/:userID/followings").get(followController.getFollowings);
router.route("/:userID/followers").get(followController.getFollowers);

module.exports = router;
