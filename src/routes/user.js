const {
  registerController,
  loginController,
  currentUserController,
} = require("../controller/userController");

const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;
