const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");

module.exports = authMiddleware = async (req, res, next) => {
  try {
    const authheader = req.headers.authorization;
    if (!authheader) {
      res.staus(404).json({
        success: false,
        message: "Token Not Found",
      });
    }
    const token = authheader.split(" ")[1];

    const decode = jwt.verify(token, JWT_KEY);
    req.user = {
      userId: decode.userId,
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Auth Failed",
    });
  }
};
