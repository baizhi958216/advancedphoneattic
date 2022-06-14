const mongoose = require("mongoose");

const touchSchema = new mongoose.Schema({
  deviceName: {
    type: String,
    required: [true, "缺少设备名！"],
    trim: true,
    unique: true,
  },
  devicePicture: {
    type: String,
    required: [true, "缺少设备图片"],
  },
  deviceVendor: {
    type: String,
    required: [true, "缺少设备制造商"],
  },
  deviceDescribe: {
    type: String,
    required: [true, "缺少设备描述"],
  },
});

const Device = mongoose.model("Device", touchSchema);

module.exports = Device;
