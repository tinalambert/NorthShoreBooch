const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/', (req, res) => {
  res.render('checkout', { title: 'Checkout' });
});

module.exports = router;
