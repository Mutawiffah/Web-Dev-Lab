// productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Assuming the Product model is defined

// Route to show all products (Shop page)
router.get('/shop', async (req, res) => {
  try {
    const products = await Product.find();  // Fetch all products from MongoDB
    res.render('shop', { products, title: 'Shop' });  // Render the products on the shop page
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching products');
  }
});

module.exports = router;
