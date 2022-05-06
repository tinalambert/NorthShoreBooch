const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const Cart = require('../models/Cart');
const User = require('../models/User')
const mongoose = require("mongoose");


router.get('/:id', async (req, res) => {
  let token = req.cookies.loggedIn;
  let secret = process.env.JWT_SECRET;
  let decoded = jwt.verify(token, secret, { complete: true });
  let userId = decoded.payload.id;
  
  const user = await User.findById(userId).exec()
  .then((user) => {
    let cartItems = user.cart.items
    res.render('checkout', { title: 'Checkout', cartItems, user});
    })
});

module.exports = router;
