let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
   res.render("products", {title: "Products"})
})


module.exports = router;