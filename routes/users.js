const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = +process.env.BCRYPT_SALT;
const User = require('../models/User');
const assignJWT = require('../middleware/assignJWT');
// const passport = require('passport');

router.get('/register', (req, res) => {
  if (req.cookies.loggedIn) {
    return res.redirect('/');
  }
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
  if (req.cookies.loggedIn) {
    return res.redirect('/');
  }
  res.render('login');
});

router.post('/login', assignJWT, (req, res, next) => {
  res.redirect('/');
});

///////////// WORK IN PROGRESS AND TESTING. Please ingnore./////////////////////////////

// router.post(
//   '/check',
//   passport.authenticate('local', {
//     session: false,
//     // successRedirect: '/',
//     // failureRedirect: '/users/login',
//   }),
//   (req, res) => {
//     res.send('WHAT DID IT WORK');
//   }
// );

// router.get(
//   '/current',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     // console.log(req.user);
//     res.redirect('/');
//   }
// );

///////////////////////////////////////////////////////////////////////////////////

router.get('/logout', async (req, res) => {
  // req.logOut();
  res.clearCookie('loggedIn');
  res.redirect('/');
});

module.exports = router;
