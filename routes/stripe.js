const express = require('express');
const app = require('../app');
const router = express.Router();
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send("Hello, Stripe!");
});

module.exports = router;