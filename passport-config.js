const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('./models/User');
const secret = process.env.JWT_SECRET;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

// function initialize(passport, getUserByUsername) {
//   const authenticateUser = async (username, password, done) => {
//     const user = getUserByUsername(username);
//     if (!user) {
//       return done(null, false, { message: 'No user with that username' });
//     }

//     try {
//       if (await bcrypt.compareSync(password, user.password)) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: 'Password incorect' });
//       }
//     } catch (err) {
//       return done(err);
//     }
//   };
//   passport.use(
//     new localStrategy({ usernameField: 'username' }, authenticateUser)
//   );
//   passport.serializeUser((user, done) => {});
//   passport.deserializeUser((id, done) => {});
// }

// module.exports = initialize;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
      //   let user = User.findById(jwt_payload.id);
      //   try {
      //     if (user) {
      //       return done(null, user);
      //     }
      //     return done(null, false);
      //   } catch (err) {
      //     console.log(err);
      //   }
    })
  );
};
