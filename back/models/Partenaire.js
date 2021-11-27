const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PartenaireSchema = new Schema({
    name: { type: String },
    contact: { type: String }
});

module.exports = mongoose.model('Partenaire', PartenaireSchema);