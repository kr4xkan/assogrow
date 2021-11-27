const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  siret: { type: String },
  email: { type: String },
  address: { type: String },
  password: { type: String }
});

module.exports = mongoose.model('User', UserSchema);