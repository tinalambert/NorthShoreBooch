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
    decoded = jwt.verify(token, secret, {complete: true});
    isAdmin = decoded.payload.isAdmin;
  }
  const products = await Product.find()
    products.forEach((product) => {
      // console.log(8888, product.isAdmin)
      product.isAdmin = isAdmin
    })
    res.render('products', { title: 'Products', products, loggedIn, isAdmin });
  //console.log(products)
});

router.get('/update/:id', async (req, res) => {
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
  // console.log(req.params)
  const product = await Product.findById(req.params.id);
  res.render('updateProduct', { title: 'Update Product', product, loggedIn, isAdmin });
});

router.post('/update/:id', async (req, res) => {
  let productId = req.params.id;
  let product = await Product.findById(productId, req.body);

  product.save((err) => {
    if (err) {
      const error = product.validateSync().errors;
      if (error.productName) {
        return res.render("updateProduct", {product, message: error.productName.message})
      } if (error.desciption) {
        return res.render("updateProduct", {product, message: error.desciption.message})
      } if (error.productPrice) {
        return res.render("updateProduct", {product, message: error.productPrice.message})
      } if (error.imageUrl) {
        return res.redirect("updateProduct", {product, message: error.imageUrl.message})
      }
    } else {
      Product.findByIdAndUpdate(productId, req.body).exec();
      console.log('Product successfully updated, check your db');
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
