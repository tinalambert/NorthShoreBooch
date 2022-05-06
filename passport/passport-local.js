// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');
// const User = require('../models/User');

// module.exports = (passport) => {
//   passport.use(
//     new LocalStrategy(async (username, password, done) => {
//       console.log('HELLO');
//       try {
//         await User.findOne({ username: username }, (err, user) => {
//           if (err) {
//             return done(err);
//           }
//           if (!user) {
//             return done(null, false, { message: 'Incorrect username' });
//           }
//           if (!bcrypt.compareSync(password, user.password)) {
//             return done(null, false, { message: 'Incorrect password' });
//           }
//           return done(null, user);
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     })
//   );
//   // passport.serializeUser((user, done) => {
//   //   done(null, { id: user.id, username: user.username });
//   // });
//   // passport.deserializeUser((user, done) => {
//   //   User.findById(user.id, (err, user) => {
//   //     done(err, user);
//   //   });
//   // });
// };
