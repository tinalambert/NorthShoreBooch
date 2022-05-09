const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let isAdmin;
    let loggedIn = true;

    if (req.user.isAdmin === true) {
      let staff = [];
      let volunteers = [];
      staff = await User.find({ isAdmin: true });
      volunteers = await User.find({ isVolunteer: true });
      staff.forEach((user) => {
        if (user.avatar === undefined) {
          user.avatar =
            'https://i.pinimg.com/280x280_RS/29/05/d1/2905d11911c116456aa4482617200825.jpg';
        }
      });

      volunteers.forEach((user) => {
        if (user.avatar === undefined) {
          user.avatar =
            'https://i.pinimg.com/280x280_RS/29/05/d1/2905d11911c116456aa4482617200825.jpg';
        }
      });
      return res.render('adminList', {
        title: 'Admin',
        loggedIn,
        isAdmin,
        volunteers,
        staff,
      });
    }
    res.redirect('/');
  }
);

router.get(
  '/search',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let lName = req.query.search;
    let users;

    if (lName === '') return res.redirect('/admin');

    users = await User.find({ lastName: lName });

    if (!users) return res.redirect('/admin');

    if (users) {
      let isAdmin = true;
      let loggedIn = true;
      return res.render('adminList', {
        title: 'Admin',
        isAdmin,
        loggedIn,
        users,
      });
    }
  }
);

router.post(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let form = req.body;
    let id = req.params.id;

    try {
      await User.findByIdAndUpdate(id, {
        isAdmin: form.isAdmin,
        isVolunteer: form.isVolunteer,
      });
    } catch (err) {
      res.send(err.message);
    }

    res.redirect('/admin');
    //   console.log(form.isVolunteer);
  }
);

module.exports = router;
