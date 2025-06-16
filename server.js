const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/authRoutes");

const server = express();

server.use(express.static(path.join(__dirname, "public")));

server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
  })
);

server.set("view engine", "ejs");
server.use(expressLayouts);
server.set("layout", "layout"); 

server.use((req, res, next) => {
  res.locals.user = req.session.userId ? true : null;
  next();
});

mongoose
  .connect("mongodb://localhost:27017/webproducts")
  .then(() => console.log("✅ MongoDB connected successfully"));

server.use("/", authRoutes);

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

server.get("/", (req, res) => {
  res.redirect("/landingpage");
});

server.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

server.listen(4000, () => {
  console.log("🚀 Server started at http://localhost:4000");
});
