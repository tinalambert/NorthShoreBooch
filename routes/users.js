const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = +process.env.BCRYPT_SALT;
const User = require('../models/User');
const assignJWT = require('../middleware/assignJWT');
const passport = require('passport');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, password, repeatPassword } =
    req.body;

  const uName = await User.findOne({ username: username });

  if (uName) {
    return res.render('register', {
      message: 'Username has already been used!',
    });
  }
  if (password != repeatPassword) {
    return res.render('register', { message: 'Passwords do not match' });
  } else {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: hash,
    });

    await newUser.save();
    res.redirect('/users/login');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

// router.post('/login', assignJWT, (req, res, next) => {
//   res.redirect('/');
// });
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

router.get('/logout', async (req, res) => {
  res.clearCookie('loggedIn');
  res.redirect('/');
});

module.exports = router;
