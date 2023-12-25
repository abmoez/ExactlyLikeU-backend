const express = require("express");
const blockController = require("./../controllers/blockController");
const authController = require("./../controllers/authController");

const router = express();
// block , unblock
router
  .route("/:userID")
  .post(authController.protect, blockController.block)
  .delete(authController.protect, blockController.unblock);

router
  .route("/:userID/blockList")
  .get(authController.protect, blockController.getBlockList);

module.exports = router;
