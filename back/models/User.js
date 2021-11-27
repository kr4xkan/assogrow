const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String },
    siret: { type: String },
    email: { type: String },
    address: { type: String },
    password: { type: String }
});

autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, {
    model: 'user',
    field: 'id'
})

module.exports = mongoose.model('User', UserSchema);