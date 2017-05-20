const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');
const base62 = require('base62');

const pollSchema = mongoose.Schema({
  question: String,
  slug: String,
  answers: [{ answer: String, votes: Number }],
  voters: [{ voter: mongoose.Schema.ObjectId }]
});

// create a slug and then timestamp is to ensure it is unique
pollSchema.pre('save', async function(next) {
  if (!this.isModified('question')) {
    next();
    return;
  }
  this.slug = (slug(this.question) + '-' + base62.encode(Date.now()));
  next();
});

module.exports = mongoose.model('Poll', pollSchema);
