const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Not a valid email.'],
    required: 'Please supply an email address.'
  },
  name: {
    type: String,
    required: 'Please supply a name.',
    trim: true
  }
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

// TODO: 
// userSchema.plugin(mongodbErrorHandler);


module.exports = mongoose.model('User', userSchema);
