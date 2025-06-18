// Middleware to check if the user is logged in
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();  // User is logged in, continue to the next middleware
  }

  // Store the current URL so we can redirect back to it after login
  req.session.redirectTo = req.originalUrl; // Store the original URL the user tried to access
  res.redirect('/login');  // Redirect to login page if not logged in
}
