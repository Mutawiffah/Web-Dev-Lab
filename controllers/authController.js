const User = require("../models/user");
const bcrypt = require("bcrypt");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("login", {
        title: "login",
        pageStyle: "login",
        error: "Email already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    return res.redirect("/login");
  } catch (err) {
    console.error(err);
    return res.status(500).render("register", {
      title: "Register",
      pageStyle: "register",
      error: "An error occurred during registration",
    });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
  console.log("User not found");
  return res.status(400).render("login", {
    title: "Login",
    pageStyle: "login",
    error: "Invalid credentials"
  });
}
console.log("Found user:", user.email);


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render("login", { title: "Login", pageStyle: "login", error: "Invalid credentials" });
    }

    // ✅ Store user data in session
    req.session.userId = user._id;
    req.session.email = user.email;
    req.session.isAdmin = user.isAdmin;

    // ✅ Redirect based on admin status
    if (user.isAdmin) {
      return res.redirect("/admin/dashboard");
    }

    return res.redirect("/landingpage");
  } catch (err) {
    console.error(err);
    res.status(500).render("login", { title: "Login", pageStyle: "login", error: "Server error" });
  }
}

function logoutUser(req, res) {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    return res.redirect("/login");
  });
}

module.exports = { handleUserSignup, handleUserLogin, logoutUser };
