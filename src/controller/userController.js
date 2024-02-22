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

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const passwordCheck = await user.comparePassword(password);
    if (!passwordCheck) {
      res.status(404).json({
        success: false,
        message: "Invalid crediantial",
      });
    }

    const token = await user.createJWT();
    res.status(200).json({
      success: false,
      message: "User logged successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong in login controller",
    });
  }
};

module.exports = { registerController, loginController };
