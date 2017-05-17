const passport = require('passport');

// local auth
exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/'
});

// Twitter auth
exports.twitterLogin = passport.authenticate('twitter');
exports.twitterLoginDone = passport.authenticate('twitter', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You signed in with Twitter'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You have logged out.');
  res.redirect('/login');
}

// middleware to determine if user is logged in
exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('danger', 'You must be logged in to do that.');
  res.redirect('/login');
}

// middleware to determine if user is not logged in. Created to prevent
// an already authtenticated user from logging in twice.
exports.isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('warning', 'You must logout to do that.');
  res.redirect('back');
}
