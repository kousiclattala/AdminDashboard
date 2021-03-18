const express = require("express");
const router = express.Router();

const {
  getAllTrips,
  addTrip,
  getOngoingTrips,
  assignAgentToTrip,
} = require("../controllers/tripsController");

const { isSignedIn } = require("../controllers/authController");

router.get("/getAllTrips", isSignedIn, getAllTrips);

router.post("/addTrip", isSignedIn, addTrip);

router.get("/ongoingTrips", isSignedIn, getOngoingTrips);

router.post("/:tripId/assignAgent", isSignedIn, assignAgentToTrip);
module.exports = router;
