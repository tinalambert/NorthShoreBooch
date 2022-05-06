const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

router.get('/', async function (req, res) {
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

  const events = await Event.find({}).lean().sort('date');

  res.render('events', { events, loggedIn, isAdmin });
});

router.post('/', async (req, res) => {
  const { event, date, description, imageUrl } = req.body;

  const newEvent = new Event({
    event: event,
    date: date,
    description: description,
    imageUrl: imageUrl,
  });

  await newEvent.save((err) => {
    if (err) {
      const error = newEvent.validateSync().errors;
      if (error.event) {
        res.render('events', { message: error.event.message });
      }
      if (error.date) {
        res.render('events', { message: error.date.message });
      }
      if (error.description) {
        res.render('events', { message: error.description.message });
      }
    } else {
      console.log('New event saved!');
      res.redirect('events');
    }
  });
});

router.get('/signUp', (req, res) => {
  console.log('firing!');
});

module.exports = router;
