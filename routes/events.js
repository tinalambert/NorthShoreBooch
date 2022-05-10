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
    decoded = jwt.verify(token, secret, {complete: true});
    isAdmin = decoded.payload.isAdmin;
  }
  const events = await Event.find({}).lean().sort('date');

  events.forEach((event) => {
    event.isAdmin = isAdmin;
  })

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
      res.redirect('events');
    }
  });
});

router.get('/update/:id', async (req, res) => {
  let token;
  let decoded;
  let isAdmin;
  let loggedIn = false;
  if (req.cookies.loggedIn) {
    loggedIn = true;
    token = req.cookies.loggedIn;
    decoded = jwt.verify(token, secret, {complete: true});
    isAdmin = decoded.payload.isAdmin;
  }
  const event = await Event.findById(req.params.id)

  res.render('updateEvent', {title: "Update event", event, loggedIn, isAdmin})
})

router.post('/update/:id', async(req, res) => {
  
  const eventId = req.params.id;
  const event = await Event.findById(eventId, req.body).exec()

  await event.save((err) => {
    if(err) {
      console.log(err)
    } else {
      Event.findByIdAndUpdate(eventId, event).exec()
      res.redirect('/events'); 
    }
  })
})

router.get('/delete/:id', async(req,res) => {
  let token;
  let decoded;
  let isAdmin;
  let loggedIn = false;
  if (req.cookies.loggedIn) {
    loggedIn = true;
    token = req.cookies.loggedIn;
    decoded = jwt.verify(token, secret, {complete: true});
    isAdmin = decoded.payload.isAdmin;
  }
  const event = await Event.findById(req.params.id);

  res.render('deleteEvent', {title:"Delete Event", event, loggedIn, isAdmin})
})

router.post('/delete/:id', async(req, res) => {
  
  const eventId = req.params.id;
  const event = await Event.findByIdAndDelete(eventId);

  res.redirect('/events')
})

// GET ADD PLANT ROUTE //
router.get("/add", (req, res) => {
  let token;
  let decoded;
  let isAdmin;
  let loggedIn = false;
  if (req.cookies.loggedIn) {
    loggedIn = true;
    token = req.cookies.loggedIn;
    decoded = jwt.verify(token, secret, {complete: true});
    isAdmin = decoded.payload.isAdmin;
  }
  res.render("addEvent", {loggedIn, isAdmin})
})

module.exports = router; 