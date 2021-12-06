const mongoose = require("mongoose");

const User = mongoose.model(
  "Athlete",
  new mongoose.Schema({
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    weight: {
      type: String,
    },
    height: {
      type: String,
    },
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
    },
  })
);

module.exports = User;
