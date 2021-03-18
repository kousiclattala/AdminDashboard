const express = require("express");
const {
  createAgent,
  getAllAgents,
  getSingleAgent,
} = require("../controllers/agentController");
const router = express.Router();

const { isSignedIn } = require("../controllers/authController");

router.post("/createAgent", isSignedIn, createAgent);

router.get("/getAllAgents", isSignedIn, getAllAgents);

router.get("/getSingleAgent/:id", isSignedIn, getSingleAgent);

module.exports = router;
