const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/order');

// GET: All Products
router.get('/products', async (req, res) => {
    const products = await Product.find();
    console.log(products); // ← Add this
    res.render('admin/list', {
        products,
        title: 'Products'
    });
});

// GET: Add Product Form
router.get('/products/add', (req, res) => {
    res.render('admin/add');
});

// POST: Add Product
router.post('/products/add', async (req, res) => {
    const { title, price, description, imageUrl } = req.body;
    await Product.create({ title, price, description, imageUrl });
    res.redirect('/admin/products');
});

// GET: Edit Product Form
router.get('/products/edit/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('admin/edit', { product });
});

// POST: Update Product
router.post('/products/edit/:id', async (req, res) => {
    const { title, price, description, imageUrl } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { title, price, description, imageUrl });
    res.redirect('/admin/products');
});

// POST: Delete Product
router.post('/products/delete/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
});

router.get('/orders', async (req, res) => {
  const orders = await Order.find().populate('user');
  res.render('admin/orders', { orders });
});

// Admin dashboard
router.get('/dashboard', async (req, res) => {
  const productCount = await Product.countDocuments();
  const orderCount = await Order.countDocuments();
  res.render('admin/dashboard', { productCount, orderCount });
});

module.exports = router;
