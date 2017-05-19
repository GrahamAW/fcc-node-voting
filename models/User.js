const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');
const chalk = require('chalk');

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
  },
  twitterId: String
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

// pre save hook to encyrpt passsword
userSchema.pre('save', async function(next) {
  console.log(chalk.red('TODO: encrypt password before save'));
  next();
});

// called when a user has logged in using twitter. Finds the users profile
// in the database, or if it doesn't exist, creates a new profile.
userSchema.statics.twitterFindOrCreate = async function(profile) {
  const that = this;
  return new Promise( async function(resolve, reject) {
    // console.log(this);
    let user = await that.findOne({ twitterId: profile.id });
    if(user) {
      resolve({ user });
    } else {
      // setting email to profile.id@twitter because don't want to break
      // validations for my local auth stategy.
      await that.create({
        email: profile.id + '@twitter.com',
        name: profile.displayName,
        twitterId: profile.id
      });
      console.log(user);
      resolve(user);
    }
  });
}

// TODO:
// userSchema.plugin(mongodbErrorHandler);


module.exports = mongoose.model('User', userSchema);
