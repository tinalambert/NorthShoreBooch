const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async function (req, res) {
  // console.log('events is firing.');
  let loggedIn = false;
  if (req.cookies.loggedIn) {
    loggedIn = true;
  }

  const events = await Event.find({}).lean().sort('date');

  res.render('events', { events, loggedIn });
});

router.post('/', async (req, res) => {
  const { event, date, description, imageUrl } = req.body;
  // console.log(req.body);
  // console.log(event, date, description, imageUrl);

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
