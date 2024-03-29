const express = require("express");
const deviceControllers = require("../controllers/deviceControllers");
const router = express.Router();

router
  .route("/")
  .get(deviceControllers.getAllDevices)
  .post(deviceControllers.addDevice);
router
  .route("/:id")
  .get(deviceControllers.getDevice)
  .patch(deviceControllers.updateDevice)
  .delete(deviceControllers.deleteDevice);
module.exports = router;
