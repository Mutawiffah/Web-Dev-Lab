function ensureAuth(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
}

function ensureAdmin(req, res, next) {
  if (req.session.userId && req.session.isAdmin) {
    return next();
  }
  res.status(403).send('Access denied. Admins only.');
}

module.exports = {
  ensureAuth,
  ensureAdmin
};
