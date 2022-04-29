const localStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const bcrypt = require('bcrypt');
const secret = process.env.JWT_SECRET;

function initialize(passport, getUserByUsername) {
  const authenticateUser = async (username, password, done) => {
    const user = getUserByUsername(username);
    if (!user) {
      return done(null, false, { message: 'No user with that username' });
    }

    try {
      if (await bcrypt.compareSync(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorect' });
      }
    } catch (err) {
      return done(err);
    }
  };
  passport.use(
    new localStrategy({ usernameField: 'username' }, authenticateUser)
  );
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}

module.exports = initialize;
