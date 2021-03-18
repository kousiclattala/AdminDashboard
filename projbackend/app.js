require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/authRoute");
const tripRoute = require("./routes/tripsRoute");
const agentRoute = require("./routes/agentRoute");

// * Connecting To DB
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO DB");
  })
  .catch((err) => console.log(err));

// * Middleware
var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// * Middleware for routes
app.use("/auth", authRoute);
app.use("/trip", tripRoute);
app.use("/agent", agentRoute);

// * Listening to server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`SERVER STARTED AND RUNNING ON http://localhost:${port}`);
});
