const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const secretKey = require("../mongoDB");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

  try {
    const user = new User({
      email: { $eq: email },
      password: { $eq: password },
    });
    await user.save();

    const token = jwt.sign({ userId: user._id }, secretKey); // Add jwt
    res.send({ token: token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/Signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

  const user = await User.findOne({ email: { $eq: email } });
  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, secretKey); // Update jwt
    res.send({ token: token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

module.exports = router;
