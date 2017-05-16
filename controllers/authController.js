const passport = require('passport');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFash: 'Failed Login!',
  successRedirect: '/'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You have logged out.');
  res.redirect('/login');
}

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('danger', 'You must be logged in to do that.');
  res.redirect('/login');
}
