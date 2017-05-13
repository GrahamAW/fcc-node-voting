const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');



const UserSchema = mongoose.Schema({
  email: String
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

module.exports = mongoose.model('User', UserSchema);
