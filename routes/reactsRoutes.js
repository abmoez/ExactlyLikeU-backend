const express = require("express");
const reactsController = require("../controllers/reactsController");
const authController = require("../controllers/authController");

const router = express();

// add or delete react POST :postID
router
  .route("/:postID")
  .post(authController.protect, reactsController.addReact)
  .delete(authController.protect, reactsController.deleteReact);

// get agreed reacts GET :postID
router
  .route("/agreedReacts/:postID")
  .get(authController.protect, reactsController.getAgreedReactCount);
// get disagreed reacts GET :postID
router
  .route("/notAgreedReacts/:postID")
  .get(authController.protect, reactsController.getNotAgreedReactCount);

module.exports = router;
