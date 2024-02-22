const mongoose = require("mongoose");
const { DB_URL } = require("./serverConfig");

module.exports.connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully connected to database");
  } catch (error) {
    console.log(error);
  }
};
