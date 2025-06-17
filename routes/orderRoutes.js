const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/authMiddleware");
const Order = require("../models/order");

router.get("/my-orders", ensureAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.session.userId }).lean();
    res.render("my-orders", { title: "My Orders", orders });
  } catch (err) {
    res.status(500).send("Error retrieving orders");
  }
});

module.exports = router;
