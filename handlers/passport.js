const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(User.createStrategy());

passport.use(new TwitterStrategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:7378/login/twitter/done'
  },
  async function(token, tokenSecret, profile, cb) {
    user = await User.twitterFindOrCreate(profile);
    return cb(null, user);
  }));

// TODO: Everything seems to be working even though this poassport-local-mongoose
// boiler plate code was replaced.
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
