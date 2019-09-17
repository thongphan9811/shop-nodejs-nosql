const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../constants');
const schema = new Schema({
    username : String,
    password :String,
    role : { type:String, default: constants.USER.ROLE.CUSTOMER}
});

const UserModel = mongoose.model('User',schema);
module.exports = UserModel;