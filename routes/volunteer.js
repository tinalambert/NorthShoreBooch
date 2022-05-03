const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

router.get('/', (req, res) => {
  let loggedIn = false;
  if (req.cookies.loggedIn) {
    loggedIn = true;
  }
  res.render('volunteer', { title: 'Volunteer Registration', loggedIn });
});

router.post('/', (req, res) => {});

module.exports = router;
