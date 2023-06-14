const mongoose = require('mongoose');
const userSchema = require('./userSchema');

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
