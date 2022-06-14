const bbs = require("./../models/bbsModels");
// getTopoc
exports.getTopic = async (req, res) => {
  try {
    const query = await bbs.findById(req.params.id);
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
// getAllTopic
exports.getAllTopic = async (req, res) => {
  try {
    const query = await bbs.find();
    res.status(200).json({
      status: "success",
      data: query,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
// addTopic
exports.addTopic = async (req, res) => {
  try {
    const query = await bbs.create(req.body);
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
// updateTopic
exports.updateTopic = async (req, res) => {
  try {
    const query = await bbs.findByIdAndUpdate(req.params.id, req.body, {
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
// removeTopic
exports.removeTopic = async (req, res) => {
  try {
    await bbs.findOneAndDelete({ topic: req.body.topic });
    res.status(204).json({
      result: "success",
    });
  } catch (error) {
    res.status(400);
  }
};
