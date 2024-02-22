const express = require("express");
const { PORT } = require("./src/config/serverConfig");
const { connectDB } = require("./src/config/db");
const app = express();

// file imports
const userRoute = require("./src/routes/user");

//DB connection
connectDB();

//middleware
app.use(express.json());

//routes
app.use("/api/user", userRoute);
app.listen(PORT, () => {
  console.log("server started");
});
