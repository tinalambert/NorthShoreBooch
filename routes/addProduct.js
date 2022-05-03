let express = require('express');
let router = express.Router();
const Product = require('../models/Product');
const passport = require('passport');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    loggedIn = true;
    res.render('addProduct', { title: 'Add Product', loggedIn });
  }
);

router.post('/', async (req, res) => {
  const { name, desciption, price, image } = req.body;
  console.log('lalalalala...', req.body);
  const newProduct = new Product({
    productName: req.body.productName,
    description: req.body.description,
    productPrice: req.body.productPrice,
    image: req.body.image,
    // seasonality: req.body.seasonality
  });
  console.log('NewProduct is ...', newProduct);

  await newProduct.save();
  console.log('Product saved, check your db');
  res.redirect('/products');
});

module.exports = router;
