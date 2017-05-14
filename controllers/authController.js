const passport = require('passport');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFash: 'Failed Login!',
  successRedirect: '/'
});

exports.logout = (req, res) => {
  req.logout();
  // req.flash...
  res.redirect('/');
}
