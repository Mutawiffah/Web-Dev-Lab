const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { ensureAuth, ensureAdmin } = require('../middleware/auth');


router.post("/login", authController.handleUserLogin);
router.post("/register", authController.handleUserSignup);
router.get("/logout", authController.logoutUser);

router.get('/login', (req, res) => {
  res.render('login', { 
    title: 'Login',
    pageStyle: 'login',
    logoSrc: '/path-to-your-logo-image/logo.jpg',
    error: null 
  });
});

router.get("/register", (req, res) =>
  res.render("register", { title: "Register", pageStyle: "register" })
);

module.exports = router;

