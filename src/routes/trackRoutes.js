const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const Track = mongoose.model("Track");

const router = express.Router();

// Requests made using this router require the user to be signed in.
router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  console.log(req);
  const tracks = await Track.find({ userId: { $eq: req.user._id } });

  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "You must provide a name and a set of locations." });
  }

  try {
    const track = new Track({
      name: { $eq: name },
      locations: { $eq: locations },
      userId: { $eq: req.user._id },
    });
    await track.save();

    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
