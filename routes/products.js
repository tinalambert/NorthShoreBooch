let express = require("express");
const Product = require("../models/Product");
let router = express.Router();

router.get("/", async (req, res) => {
   let products;
   products = await Product.find()
   //console.log(products)
   res.render("products", {title: "Products", products})
})

module.exports = router;