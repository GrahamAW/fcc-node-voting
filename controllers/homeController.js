const Poll = require('../models/Poll');

exports.homePage = (req, res) => {
  res.render('home', {
    title: 'Home Page'
  });
}
