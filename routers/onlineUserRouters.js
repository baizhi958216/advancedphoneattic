const express = require("express");
const onlineUserControllers = require("../controllers/onlineUserControllers");
const router = express.Router();
router
  .route("/")
  .get(onlineUserControllers.getAllUserStatus)
  .post(onlineUserControllers.addUserStatus);
router.route("/:username").patch(onlineUserControllers.userExit);
module.exports = router;
