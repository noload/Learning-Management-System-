const {
  registerController,
  loginController,
} = require("../controller/userController");

const { Router } = require("express");

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
