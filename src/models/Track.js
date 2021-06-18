const mongoose = require("mongoose");

const pointsSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Refrence to another object within MongoDB.
    ref: "User", // Pointing to the User model.
  },
  name: {
    type: String,
    default: "",
  },
  locations: [pointsSchema],
});

mongoose.model("Track", trackSchema);
