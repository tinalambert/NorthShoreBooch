const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

router.get('/', (req, res, next) => {
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
  console.log(token);

  res.render('index', { title: 'Home', loggedIn, isAdmin });
});

module.exports = router;
