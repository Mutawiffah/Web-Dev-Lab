const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

const authRoutes = require("./routes/authRoutes");

const server = express();

mongoose.connect("mongodb://127.0.0.1:27017/web-auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(expressLayouts);

server.set("view engine", "ejs");
server.set("layout", "layouts/main");

server.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
  })
);

server.use("/", authRoutes);

server.get("/cv", (req, res) => {
  res.render("cv", { layout: false });
});

server.get("/landingpage", (req, res) => {
  if (!req.session.userId) return res.redirect("/login");
  res.render("landingpage");
});

server.get("/", (req, res) => {
  res.redirect("/landingpage");
});

server.listen(4000, () => {
  console.log("🚀 Server started at http://localhost:4000");
});
