let express = require('express');

const { resolve } = require('path');

let app = express();

const port = 3000;

app.use(express.static('static'));

let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 per $1

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = newItemPrice + cartTotal;
  res.send(result.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let result;
  if (isMember) {
    result = (cartTotal / 100) * discountPercentage;
    result = cartTotal - result;
  } else {
    result = cartTotal;
  }
  res.send(result.toString());
});
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let value = (cartTotal / 100) * taxRate;
  res.send(value.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let result;
  if (shippingMethod === 'standard') {
    result = Math.ceil(distance / 50);
  } else if (shippingMethod === 'express') {
    result = Math.ceil(distance / 100);
  } else {
    result = 'Invalid Shipping Method';
  }
  res.send(result.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let result = weight * distance * 0.1;
  res.send(result.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let result = purchaseAmount * loyaltyRate;
  res.send(result.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
