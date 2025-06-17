const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const server = express();

server.use(express.static("public"));

const cookieParser = require("cookie-parser");

server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
     cookie: { maxAge: 60000 * 60 * 24 },
    httpOnly: true,
    secure: false 
  }
}));

server.use((req, res, next) => {
  res.locals.user = req.session.userId ? true : null;
  next();
});

server.set("view engine","ejs");
server.set('views', path.join(__dirname, 'views'));

server.use(expressLayouts);
server.set('layout', 'layout');

mongoose
  .connect("mongodb://localhost:27017/webproducts")
  .then(() => console.log("✅ MongoDB connected successfully"));

const authRoutes = require("./routes/authRoutes");
server.use("/", authRoutes);

const orderRoutes = require("./routes/orderRoutes");
server.use("/", orderRoutes);

server.get("/cv", (req, res) => {
  res.render("cv", { title: "CV" });
});

server.get("/landingpage", (req, res) => {
  if (!req.session.userId) return res.redirect("/login");
  res.render("landingpage", { title: "Home", pageStyle: "style" });
});

server.get("/", (req, res) => {
  if (!req.session.userId) return res.redirect("/login");
  res.redirect("/landingpage");
});

server.get("/login", (req, res) => {
  res.render("login", { title: "Login", pageStyle: "login" });
});

server.get("/signup", (req, res) => {
  res.render("register", { title: "Register", pageStyle: "register" });
});

server.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

server.listen(4000, () => {
  console.log("🚀 Server started at http://localhost:4000");
});
