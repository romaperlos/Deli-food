function checkAuthSession(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/registration')
  }
}

module.exports = checkAuthSession;
