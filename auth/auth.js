function checkAuthSession(req, res, next) {
  if (req.session.user || req.session.courier) {
    next()
  } else {
    res.redirect('/')
  }
}

module.exports = checkAuthSession;
