const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const cors = require("cors");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/communication"));

module.exports = app;
