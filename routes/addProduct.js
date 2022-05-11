const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
    res.render("addProduct", { title: "Add Product", loggedIn, isAdmin });
  }
);

router.post("/", async (req, res) => {
  //  const {name, desciption, price, image} = req.body
  //  console.log("lalalalala...", req.body)
  const newProduct = new Product({
    productName: req.body.productName,
    description: req.body.description,
    productPrice: req.body.productPrice,
    imageUrl: req.body.imageUrl,
    // seasonality: req.body.seasonality
  });
  // console.log("NewProduct is ...", newProduct);
  newProduct.save((err) => {
    if (err) {
      const error = newProduct.validateSync().errors;
      if (error.productName) {
        return res.render("addProduct", { message: error.productName.message });
      }
      if (error.desciption) {
        return res.render("addProduct", { message: error.desciption.message });
      }
      if (error.productPrice) {
        return res.render("addProduct", {
          message: error.productPrice.message,
        });
      }
      if (error.imageUrl) {
        return res.render("addProduct", { message: error.imageUrl.message });
      }
    }
    console.log("Product saved, check your db");
    res.redirect("/products");
  });
});

module.exports = router;
