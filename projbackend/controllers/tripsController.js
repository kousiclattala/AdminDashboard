const { ISO_8601 } = require("moment");
const moment = require("moment");
const Trip = require("../models/trips");

exports.addTrip = async (req, res) => {
  try {
    const trip = new Trip({
      from: req.body.from,
      to: req.body.to,
      truckType: req.body.truckType,
      date: new Date(req.body.date),
    });

    await trip.save((err, trip) => {
      if (err) {
        return res.status(400).json({
          err: "Error saving in Trip",
        });
      }

      res.json({
        msg: "Trip Added Successfully",
        trip,
      });
    });
  } catch (error) {
    res.json({
      err: error,
    });
  }
};

exports.getAllTrips = async (req, res) => {
  try {
    Trip.find()
      .then((trips) => {
        if (trips == "") {
          res.json({
            err: "No trips in DB",
          });
        } else {
          res.json(trips);
        }
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({
            err: "Error in Finding Trips",
          });
        }
      });
  } catch (error) {
    res.json({
      err: error,
    });
  }
};

exports.getOngoingTrips = async (req, res) => {
  try {
    var currentDate = moment().format("YYYY-MM-DD");
    const trips = await Trip.find({ date: { $gte: currentDate } });

    if (trips == {}) {
      res.json({
        err: "No Data Found in DB",
      });
    } else {
      res.json(trips);
    }
  } catch (error) {
    res.json({
      err: error,
    });
  }
};

exports.assignAgentToTrip = async (req, res) => {
  try {
    const { tripId, agentName } = req.body;

    await Trip.findByIdAndUpdate(
      tripId,
      { $set: { assignedToAgent: agentName } },
      (err, docs) => {
        if (err) {
          res.status(400).json({
            err: error,
          });
        } else {
          res.json({
            msg: "Agent Assigned Successfully",
            docs,
          });
        }
      }
    );
  } catch (error) {
    res.status(400).json({
      err: error,
    });
  }
};
