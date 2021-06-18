require("./models/User");
require("./models/Track");
const mongoURI = require("./mongoDB");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

// express used for exposing the API.
const app = express();

app.use(express.json());

// Link the route handlers.
app.use(authRoutes);
app.use(trackRoutes);

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

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
