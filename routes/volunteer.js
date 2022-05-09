const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
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
  const { firstName, lastName, email, phoneNumber, task } = req.body;

  const uVolunteer = await Volunteer.findOne({ email: email });

  if (uVolunteer) {
    return res.render('register', { message: 'Email has already been used!' });
  } else {
    console.log('volunteer created!');

    const newVolunteer = new Volunteer({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      task: task,
    });

    await newVolunteer.save((err) => {
      if (err) {
        const error = newVolunteer.validateSync().errors;
        if (error.firstName) {
          return res.render('volunteer', { message: error.firstName.message });
        }
        if (error.lastName) {
          return res.render('volunteer', { message: error.lastName.message });
        }
        if (error.email) {
          return res.render('volunteer', { message: error.email.message });
        }
      } else {
        console.log('Volunteer saved, check DB!');
        res.redirect('/');
      }
    });
  }
});

module.exports = router;
