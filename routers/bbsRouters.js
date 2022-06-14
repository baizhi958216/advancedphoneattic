const express = require("express");
const bbsControllers = require("../controllers/bbsControllers");
const router = express.Router();
router
  .route("/")
  .get(bbsControllers.getAllTopic)
  .post(bbsControllers.addTopic)
  .delete(bbsControllers.removeTopic);
router
  .route("/:id")
  .get(bbsControllers.getTopic)
  .patch(bbsControllers.updateTopic);
module.exports = router;
