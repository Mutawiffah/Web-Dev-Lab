const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { ensureAuth, ensureAdmin } = require('../middleware/auth');

// GET Contact page
router.get('/contact', ensureAuth, (req, res) => {
  res.render('site/contact');
});

// POST Complaint
router.post('/contact', ensureAuth, async (req, res) => {
  try {
    const { orderId, message } = req.body;
    if (!orderId || !message) {
      req.flash('error', 'All fields are required');
      return res.redirect('/contact');
    }

    await Complaint.create({
      userId: req.session.userId,
      orderId,
      message
    });

    req.flash('success', 'Complaint submitted successfully');
    res.redirect('/contact');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Something went wrong');
    res.redirect('/contact');
  }
});

// GET My Complaints
router.get('/my-complaints', ensureAuth, async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.session.userId }).sort({ submittedAt: -1 });
    res.render('site/my-complaints', { complaints });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error loading complaints');
    res.redirect('/');
  }
});

module.exports = router;
