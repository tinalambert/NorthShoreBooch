const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/User');
const secret = process.env.JWT_SECRET;

const cookieExtractor = (req) => {
  let token;
  if (req && req.cookies) {
    token = req.cookies['loggedIn'];
  }
  return token;
};

module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = cookieExtractor;
  opts.secretOrKey = secret;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
};
