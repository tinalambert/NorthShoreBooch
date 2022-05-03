let express = require('express');
const Product = require('../models/Product');
let router = express.Router();

router.get('/', async (req, res) => {
  let loggedIn = false;
  if (req.cookies.loggedIn) {
    loggedIn = true;
  }

  let products;
  products = await Product.find();
  console.log(products);
  res.render('products', { title: 'Products', products, loggedIn });
});

module.exports = router;
