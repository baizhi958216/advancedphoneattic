const mongoose = require("mongoose");

const touchSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "缺少用户帐号！"],
    trim: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: [true, "缺少用户密码"],
    trim: true,
  },
  userType: {
    type: String,
    trim: true,
  },
  userLoginTime: {
    type: String,
    trim: true,
  },
});

const Account = mongoose.model("Account", touchSchema);

module.exports = Account;
