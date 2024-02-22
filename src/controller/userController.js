const userModel = require("../models/userModel");

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(404).json({
        success: false,
        message: "All Fields are required",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(404).json({
        success: false,
        message: "User already exist. Try with other email ",
      });
    }

    const user = await userModel.create(req.body);
    res.status(200).json({
      success: true,
      message: "User Created Successfully",
      userId: user._id,
    });
  } catch (error) {}
};

module.exports = { registerController };
