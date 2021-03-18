const express = require("express");
const router = express.Router();

const {
  signin,
  getUser,
  allUsers,
  signup,
  isSignedIn,
  signout,
} = require("../controllers/authController");

router.get("/singleUser/:id", isSignedIn, getUser);

router.post("/signup", signup);

router.get("/allUsers", isSignedIn, allUsers);

router.post("/signin", signin);

router.get("/signout", signout);

module.exports = router;
