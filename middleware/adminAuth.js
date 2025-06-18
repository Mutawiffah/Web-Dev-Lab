module.exports = function (req, res, next) {
  if (!req.session.userId || !req.session.isAdmin) {
    return res.redirect('/login');  // Redirect to login if not authenticated
  }
  next();  // If admin, proceed to the next route
};
