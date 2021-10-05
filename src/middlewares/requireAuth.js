const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
//const db = require("../mongoDB");

requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");

/*
To connect to your mondoDB cluster, replace db.secretKey below
with the secret key for your database cluster.

  jwt.verify(token, db.secretKey, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in" });
    }

    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;
    next();
  });
*/
};

module.exports = requireAuth;
