const Account = require("./../models/accountModels");
// getAllUser
exports.getAllUser = async (req, res) => {
  try {
    let query = await Account.find();
    res.status(200).json({
      status: "success",
      data: {
        query,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
// getModifyUser
exports.getModifyUser = async (req, res) => {
  try {
    const query = await Account.findById(req.params.id);
    res.status(201).json({
      status: "success",
      data: {
        query,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
};
// getUser
exports.getUser = async (req, res) => {
  try {
    /* 
    // 效率较低 不用为妙
    const query = await Account.aggregate([
      {
        $group: {
          _id: null,
          logintime: { $max: "$userLoginTime" },
        },
      },
    ]);
    */
    const latestUserLoginTime = await Account.find()
      .sort({ userLoginTime: -1 })
      .limit(1);
    if (latestUserLoginTime[0].userLoginTime) {
      res.status(201).json({
        status: "success",
        userName: latestUserLoginTime[0].userName,
      });
    } else {
      res.status(201).json({
        status: "success",
        userName: null,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
};
// updateUser
exports.updateUser = async (req, res) => {
  try {
    const query = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: "success",
      data: {
        query,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
};
// addUser
exports.addUser = async (req, res) => {
  try {
    const query = await Account.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        query,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
};
// deleteUser
exports.deleteUser = async (req, res) => {
  try {
    await Account.findOneAndDelete({ userName: req.body.userName });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      message: error,
    });
  }
};

// userAuth
exports.userAuth = async (req, res) => {
  try {
    let userName = req.body.userName,
      password = req.body.userPassword;
    const query = await Account.find({
      userName: userName,
    });
    if (password == query[0].userPassword) {
      switch (query[0].userType) {
        case "USER":
          {
            await Account.findOneAndUpdate(
              { userName: userName },
              { userLoginTime: Date.now() },
              {
                new: true,
                runValidatours: true,
              }
            );
            res.status(201).json({
              status: "1",
              data: {
                message: "登录成功",
                href: "http://127.0.0.1:8000/public/USER/user.html",
              },
            });
          }
          break;
        case "ADMIN":
          {
            await Account.findOneAndUpdate(
              { userName: userName },
              { userLoginTime: Date.now() },
              {
                new: true,
                runValidatours: true,
              }
            );
            res.status(201).json({
              status: "2",
              data: {
                message: "登录成功",
                href: "http://127.0.0.1:8000/public/ADMIN/admin.html",
              },
            });
          }
          break;

        default:
          break;
      }
    } else {
      res.status(400).json({
        status: "3",
        data: {
          message: "密码错误",
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "0",
      data: {
        message: "账号不存在",
      },
    });
  }
};
