const mongoose = require("mongoose");

const touchSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: [true, "缺少主题！"],
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  reply: {
    type: String,
    trim: true,
  },
  read: {
    type: String,
    trim: true,
  },
  postDate: {
    type: String,
    trim: true,
  },
});

const Bbs = mongoose.model("Bbs", touchSchema);

module.exports = Bbs;
