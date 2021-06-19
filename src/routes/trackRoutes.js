const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const Track = mongoose.model("Track");

const router = express.Router();

// Requests made using this router require the user to be signed in.
router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  console.log(req);
  const track = await Track.find({ userId: req.user._id });

  res.send(track);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;

  if (typeof name !== "string" || name === "") {
    return res.status(422).send({ error: "Enter a valid name" });
  }

  if (!locations) {
    return res.status(422).send({ error: "Provide a set of locations" });
  }

  try {
    const track = new Track({
      name: name,
      locations: locations,
      userId: req.user._id,
    });
    await track.save();

    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
