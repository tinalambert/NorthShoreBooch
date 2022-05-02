const Product = require("../models/Product");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const mongoose = require("mongoose");

//  //postCart will a particular product (prodId) to the cart , it will check if a product is exis ted first or else it will add new product

// add to cart will go to this route
exports.postCart = async (req, res, next) => {
  const productId = req.params.id;
  let token = req.cookies.loggedIn;
  let secret = process.env.JWT_SECRET;
  let decoded = jwt.verify(token, secret, { complete: true });
  let userId = decoded.payload.id;
  console.log("USER ID IS ", userId);

  const user = await User.findById(userId);
  console.log(user);

  const product = await Product.findById(productId);
  console.log(product);

  Product.findById(productId)
    .then((product) => {
      console.log("add to cart product is ", product);

      return user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/products");
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.params.id;
  req.user //always request a user first
    .deleteItemFromCart(productId)
    .then((result) => {
      res.redirect("/cart");
    })

    .catch((err) => {
      console.log(err);
    });
};
exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      console.log(user.cart.items);

      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });

      const order = new Order({
        products: products,
        user: {
          name: req.user.name,
          userId: req.user,
        },
      });

      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};