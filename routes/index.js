const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  let loggedIn = false;
  if (req.cookies.loggedIn) {
    loggedIn = true;
  }
  res.render('index', { title: 'Home', loggedIn });
});

module.exports = router;
