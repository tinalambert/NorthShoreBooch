const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Event = require('../models/Event');

router.get('/', async (req, res) => {

  const productName = req.query.search;
  const eventName = req.query.search;

  let products = [];
  let events = [];

  if (!productName || !eventName) {
    return res.render('searchResults', { message: 'No results found!' });
  }
  if (productName || eventName) {
    products = await Product.find({
      productName: { $regex: productName, $options: 'i' },
    }).exec();
    events = await Event.find({
      event: { $regex: eventName, $options: 'i' },
    }).exec();

    return res.render('searchResults', { products, events });
  }
  res.redirect('/');
});

module.exports = router;
