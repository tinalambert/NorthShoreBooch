const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = +process.env.BCRYPT_SALT;
const User = require('../models/User');
const assignJWT = require('../middleware/assignJWT');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
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

router.get('/profile', async (req, res) => {
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
  let user = await User.findById(decoded.payload.id);

  if (user.avatar === undefined) {
    user.avatar =
      'https://i.pinimg.com/280x280_RS/29/05/d1/2905d11911c116456aa4482617200825.jpg';
  }
  res.render('user-profile', {
    title: 'User Profile',
    loggedIn,
    isAdmin,
    user,
  });
});

router.post('/profile/:id', async (req, res) => {
  let form = req.body;
  let id = req.params.id;
  await User.findByIdAndUpdate(id, form);
  res.redirect('/users/profile');
});

router.get('/delete/:id', async (req, res) => {
  let id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.clearCookie('loggedIn');
  } catch (err) {
    console.log(err);
  }
  res.redirect('/');
});

module.exports = router;
