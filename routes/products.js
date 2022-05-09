const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

router.get('/', async (req, res) => {
  let token;
  let decoded;
  let isAdmin;
  let loggedIn = false;
  if (req.cookies.loggedIn) {
    loggedIn = true;
    token = req.cookies.loggedIn;
    decoded = jwt.verify(token, secret, { complete: true });
    isAdmin = decoded.payload.isAdmin;
  }
  let products = [];
  products = await Product.find();
  //console.log(products)
  res.render('products', { title: 'Products', products, loggedIn, isAdmin });
});

router.get('/update/:id', async (req, res) => {
  // console.log(req.params)
  const product = await Product.findById(req.params.id);
  res.render('updateProduct', { title: 'Update Product', product });
});

router.post('/update/:id', async (req, res) => {
  let productId = req.params.id;
  let product = await Product.findById(productId, req.body);

  await product.save((err) => {
    if (err) {
      console.log(err);
    } else {
      Product.findByIdAndUpdate(productId, product).exec();
      // console.log('Product successfully updated, check your db');
      res.redirect('/products');
    }
  });
});

router.get('/delete/:id', async (req, res) => {
  let product = await Product.findById(req.params.id);
  res.render('deleteProduct', { title: 'Delete Product', product });
});

router.post('/delete/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  // console.log('Product deleted, check your db');
  res.redirect('/products');
});

module.exports = router;
