const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = +process.env.BCRYPT_SALT;
const User = require('../models/User');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, password, repeatPassword } =
    req.body;
  if (!firstName || !lastName || !username || !email || !password) {
    return res.render('register', {
      message: 'Please fill the form in its entirerty!',
    });
  }

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
    res.redirect('/');
  }
});

module.exports = router;
