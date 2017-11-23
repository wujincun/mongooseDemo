let mongoose = require('mongoose');
let UserSchema = require('../schema/user');
let User = mongoose.model('User', UserSchema);

module.exports = User