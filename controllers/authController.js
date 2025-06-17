const User = require("../models/user");
const bcrypt = require("bcrypt");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword });
  return res.redirect("/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.render("login", {
      title: "Login",
      pageStyle: "login",
      error: "Invalid credentials"
    });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.render("login", {
      title: "Login",
      pageStyle: "login",
      error: "Invalid credentials"
    });
  }

  req.session.userId = user._id;
  return res.redirect("/landingpage");
}

function logoutUser(req, res) {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    return res.redirect("/login");
  });
}

module.exports = { handleUserSignup, handleUserLogin, logoutUser };
