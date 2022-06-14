const Device = require("./../models/deviceModels");

// getAllDevices
exports.getAllDevices = async (req, res) => {
  try {
    const query = await Device.find();
    res.status(200).json({
      status: "success",
      data: {
        query,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failure",
      message: error.message,
    });
  }
};

// findDevice
exports.getDevice = async (req, res) => {
  try {
    const query = await Device.findById(req.params.id);
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

// addDevice
exports.addDevice = async (req, res) => {
  try {
    const query = await Device.create(req.body);
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

// updateDevice
exports.updateDevice = async (req, res) => {
  try {
    console.log(req.params.id);
    const query = await Device.findByIdAndUpdate(req.params.id, req.body, {
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
      message: error,
    });
  }
};

// deleteDevice
exports.deleteDevice = async (req, res) => {
  try {
    await Device.findByIdAndDelete(req.params.id);
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
