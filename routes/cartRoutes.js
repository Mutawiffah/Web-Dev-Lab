const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  req.session.redirectTo = req.originalUrl;
  res.redirect('/login');
}

router.get('/', isAuthenticated, (req, res) => {
  const cart = req.session.cart || {};
  const total = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
  res.render('cart', { cart, total });
});

router.post('/update/:id', isAuthenticated, (req, res) => {
  const productId = req.params.id;
  const quantity = parseInt(req.body.quantity, 10);
  if (!quantity || quantity <= 0) return res.redirect('/cart');
  const cart = req.session.cart || {};
  if (cart[productId]) {
    cart[productId].quantity = quantity;
    req.session.cart = cart;
  }
  res.redirect('/cart');
});

router.get('/remove/:id', isAuthenticated, (req, res) => {
  const productId = req.params.id;
  const cart = req.session.cart || {};
  delete cart[productId];
  req.session.cart = cart;
  res.redirect('/cart');
});

router.post('/clear', isAuthenticated, (req, res) => {
  req.session.cart = {};
  res.redirect('/cart');
});

module.exports = router;
