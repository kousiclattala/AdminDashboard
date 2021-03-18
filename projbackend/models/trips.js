const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const tripsSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    trim: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
  },
  truckType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    min: "2021-01-01",
    required: true,
  },
  assignedToAgent: {
    type: String,
  },
});

module.exports = mongoose.model("Trip", tripsSchema);
