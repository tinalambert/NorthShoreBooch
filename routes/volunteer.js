const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer")


router.get("/", (req, res) => {
   res.render("volunteer", {title: "Volunteer Registration"})
})

router.post("/", (req, res) => {
})

module.exports = router;