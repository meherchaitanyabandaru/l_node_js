const mongoose = require('mongoose');
const userSchema = require('./userSchema');

console.log("meher user model")
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
