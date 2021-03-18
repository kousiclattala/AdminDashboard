const mongoose = require("mongoose");

const agentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  truckType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Agent", agentsSchema);
