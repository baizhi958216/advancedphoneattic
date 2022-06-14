const onlineUser = require("./../models/onlineUserModels");
const Account = require("./../models/accountModels");
// getAllUserStatus
exports.getAllUserStatus = async (req, res) => {
  try {
    const query = await onlineUser.find();
    res.status(201).json({
      status: "success",
      data: {
        query,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};
// addUserStatus
exports.addUserStatus = async (req, res) => {
  try {
    await onlineUser.findOneAndUpdate(
      { userName: req.body.userName },
      { userStatus: "Online" }
      // {
      //   new: true,
      //   runValidatours: true,
      // }
    );
    res.status(201);
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
};
// userExit
exports.userExit = async (req, res) => {
  try {
    await onlineUser.findOneAndUpdate(
      { userName: req.params.username },
      { userStatus: "Offline" }
    );
    await Account.findOneAndUpdate(
      { userName: req.params.username },
      { userLoginTime: null }
    );
    res.status(201).json({
      status: "success",
      data: "下线成功",
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: "用户已离线",
    });
  }
};
