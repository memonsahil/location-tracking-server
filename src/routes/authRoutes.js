const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const db = require("../mongoDB");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (
    (typeof email !== "string" || email === "") &&
    (typeof password !== "string" || password === "")
  ) {
    return res.status(422).send({ error: "Enter valid credential" });
  }

  try {
    const user = new User({
      email: email,
      password: password,
    });
    await user.save();

    /*
    To connect to your mondoDB cluster, replace db.secretKey below
    with the secret key for your database cluster.

    const token = jwt.sign({ userId: user._id }, db.secretKey); // Add jwt
    res.send({ token: token });
    */
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/Signin", async (req, res) => {
  const { email, password } = req.body;

  if (
    (typeof email !== "string" || email === "") &&
    (typeof password !== "string" || password === "")
  ) {
    return res.status(422).send({ error: "Enter valid credential" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(422).send({ error: "Enter valid credential" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, db.secretKey); // Restore jwt
    res.send({ token: token });
  } catch (err) {
    return res.status(422).send({ error: "Enter valid credential" });
  }
});

module.exports = router;
