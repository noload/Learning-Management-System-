const { registerController } = require("../controller/userController");

const { Router } = require("express");

const router = Router();

router.post("/register", registerController);

module.exports = router;
