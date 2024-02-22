const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin", "student"],
    require: true,
    default: "student",
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      require: () => {
        return this.role === "student";
      },
    },
  ],
});

userSchema.pre("save", async function () {
  if (!this.isModified) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;
});

userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.createJWT = async function () {
  return jwt.sign({ userId: this._id }, JWT_KEY, {
    expiresIn: "1 day",
  });
};
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
