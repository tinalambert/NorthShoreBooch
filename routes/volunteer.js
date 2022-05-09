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
  const { firstName, lastName, userName, email, phoneNumber, task } = req.body;
  // console.log(req.body);
  // console.log(firstName, lastName, email, phoneNumber, task);

  const uVolunteer = await User.findOne({ userName: userName });

  if (uVolunteer) {
    return res.render('register', { message: 'Email has already been used!' });
  } else {
    console.log('volunteer created!');

    const newVolunteer = new User({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      task: task,
      isVolunteer: true,
    });
      console.log(newVolunteer);

    await newVolunteer.save(() => {
    res.redirect('/')  
    });
  }
});

module.exports = router;
