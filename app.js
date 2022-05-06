require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const hbs = require('hbs');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

//console.log(stripeSecretKey, stripePublicKey);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/products');
const addProductRouter = require('./routes/addProduct');
const volunteerRouter = require('./routes/volunteer');
const cartRouter = require('./routes/cart');
const eventsRouter = require('./routes/events');
const checkoutRouter = require('./routes/checkout');
const searchRouter = require('./routes/search');

// const flash = require('express-flash');

const app = express();

mongoose
  .connect(process.env.DB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log('db connected'))
  .catch((err) => console.log(err));

// view engine setup
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(flash());

//// passport middleware /////////
app.use(passport.initialize());

// app.use(
//   session({
//     secret: process.env.JWT_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   })
// );
// app.use(passport.session());

require('./passport/passport-jwt')(passport);
// require('./passport/passport-local')(passport);
// app.use(passport.authenticate('session'));

// passport.use(User.createStrategy());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/products/add', addProductRouter);
app.use('/volunteer', volunteerRouter);
app.use('/cart', cartRouter);
app.use('/events', eventsRouter);
app.use('/checkout', checkoutRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
