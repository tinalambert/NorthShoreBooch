const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

router.get('/', (req, res) => {
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
  res.render('volunteer', {
    title: 'Volunteer Registration',
    loggedIn,
    isAdmin,
  });
});

router.get('/', async (req, res) => {
  res.render('volunteer', { title: 'Volunteer Registration' });
});

router.post('/', async (req, res) => {
  const { firstName, lastName, username, email, phoneNumber, task } = req.body;
 
    const newVolunteer = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
    });

    await newVolunteer.save((err) => {
      if(err) {
        res.render('error', {message: err} )
      } else {
        res.redirect('/')  
      }
    });
});

module.exports = router;
