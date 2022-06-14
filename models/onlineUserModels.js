const mongoose = require("mongoose");

const touchSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "缺少用户帐号！"],
    trim: true,
    unique: true,
  },
  userStatus: {
    type: String,
    required: [true, "缺少用户在线信息！"],
    trim: true,
  },
});

const Onlineusers = mongoose.model("Onlineusers", touchSchema);

module.exports = Onlineusers;
