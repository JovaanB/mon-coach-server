const mongoose = require("mongoose");

const Role = mongoose.model(
  "Goal",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  })
);

module.exports = Role;
