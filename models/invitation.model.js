const mongoose = require("mongoose");

const Role = mongoose.model(
  "Invitation",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  })
);

module.exports = Role;
