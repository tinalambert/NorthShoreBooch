const express = require("express");
const router = express.Router();
const Plant = require("../models/Plant");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

router.get("/", async (req, res) => {
  //const { ScientificName, CommonName, State, Duration, GrowthRate, AdaptedCoarseSoils, AdaptedMediumSoils, AdaptedFineSoils, ShadeTolerance, RootDepthMinimum, Precipitation_Minimum, Precipitation_Maximum, BloomPeriod } = req.body
  let token;
  let decoded;
  let isAdmin;
  let loggedIn = false;
  if (req.cookies.loggedIn) {
    loggedIn = true;
    token = req.cookies.loggedIn;
    decoded = jwt.verify(token, secret, { complete: true });
    isAdmin = decoded.payload.isAdmin;
  }

  let plants = [];
  plants = await Plant.find({name: "CommonName"}).limit(4);
  //console.log(plants.Duration)
  res.render("garden", { title: "Plants", plants, loggedIn, isAdmin });
});

module.exports = router;