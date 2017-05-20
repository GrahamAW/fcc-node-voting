const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// const passportLocalMongoose = require('passport-local-mongoose');
// const validator = require('validator');
// const chalk = require('chalk');

const pollSchema = mongoose.Schema({
  question: String,
  answers: [{ answer: String, votes: Number }],
  voters: [{ voter: mongoose.Schema.ObjectId }]
});

module.exports = mongoose.model('Poll', pollSchema);
