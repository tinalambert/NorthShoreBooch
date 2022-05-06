const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const assignJWT = async (req, res, next) => {
  let { username, password } = req.body;
  let token;
  let user;

  try {
    user = await User.findOne({ username: username });
    if (!user) {
      return res.render('login', {
        message: 'Please check the username and try again!',
      });
    }

    const passMatch = bcrypt.compareSync(password, user.password);
    if (!passMatch) {
      return res.render('login', { message: 'Please enter a valid password!' });
    }

    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      isAdmin: user.isAdmin,
      id: user._id,
    };

    token = jwt.sign(payload, secret, { expiresIn: '1d' });
    res.cookie('loggedIn', token);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }

  ///////////////// UNSURE IF I WILL USE THESE ///////////////////

  res.user = user;
  res.token = token;
  res.loggedIn = true;

  next();
};

module.exports = assignJWT;
