const mongoose = require('mongoose');
const Product = require('./Product');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    accessToken: { type: String }
});

module.exports = mongoose.model('User', UserSchema);