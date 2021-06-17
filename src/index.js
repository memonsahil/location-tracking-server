require("./models/User");
require("./models/Track");
const mongoURI = require("./mongoDB");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

/*
Not assigning the User model & Track model to variables since they
need to run just once when the models are declared initially.
*/

// express used for exposing the API.
const app = express();

// Parse the request body.
app.use(bodyParser.json());

// Link the route handlers.
app.use(authRoutes);
app.use(trackRoutes);

// Mongoose helps connect to the mongoDB instance.
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDB instance!");
});

mongoose.connection.on("erorr", (err) => {
  console.log("Error connecting to mongoDB", err);
});

// Pass the jwt middlware to the initial request.
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

// Listening port set to 3000.
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
