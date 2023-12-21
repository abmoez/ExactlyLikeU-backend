const express = require("express");
const postsController = require("./../controllers/postsController");
const authController = require("./../controllers/authController");

const router = express();

// Create a new post POST

// update current post PATCH :postID

// delete current post DELETE :postID

// get posts - user dependent GET

// get posts (profile) GET :userID

// get trends GET

module.exports = router;
