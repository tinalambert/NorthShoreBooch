let express = require("express");
let router = express.Router();
const Product = require('../models/Product')

router.get("/", (req, res) => {
   res.render("addProduct", {title: "Add Product"})
})

router.post("/", async (req, res) => {
   const {name, desciption, price, image} = req.body
   console.log("lalalalala...", req.body)
   const newProduct = new Product ({
      productName: req.body.productName,
      description: req.body.description,
      productPrice: req.body.productPrice,
      imageUrl: req.body.imageUrl,
      // seasonality: req.body.seasonality
   })
   console.log("NewProduct is ...", newProduct)

   await newProduct.save();
   console.log("Product saved, check your db")
   res.redirect('/products')
   
})

module.exports = router;