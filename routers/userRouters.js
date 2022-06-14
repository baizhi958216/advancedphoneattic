const express = require("express");
const accountControllers = require("../controllers/accountControllers");
const router = express.Router();
router
  .route("/")
  .get(accountControllers.getUser)
  .delete(accountControllers.deleteUser);
router.route("/:id").patch(accountControllers.updateUser);
router.route("/byid/:id").get(accountControllers.getModifyUser);
router.route("/all").get(accountControllers.getAllUser);
router.route("/login").post(accountControllers.userAuth);
router.route("/sign").post(accountControllers.addUser);
module.exports = router;
