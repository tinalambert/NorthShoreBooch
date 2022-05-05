const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/', (req, res) => {
  const button = document.querySelector("button")
  button.addEventListener("click", () => {
    fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {id: 1, quantity: 3},
          {id: 2, quantity: 1},
        ],
      }),
    })
    .then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
      window.location = url
    }).catch
  })
  res.render('checkout', { title: 'Checkout' });
});

module.exports = router;
