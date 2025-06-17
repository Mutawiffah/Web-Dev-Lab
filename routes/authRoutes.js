const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get("/register", (req, res) =>
  res.render("register", { title: "Register", pageStyle: "register" })
);

router.post("/login", authController.handleUserLogin);
router.post("/register", authController.handleUserSignup);
router.get("/logout", authController.logoutUser);

module.exports = router;
