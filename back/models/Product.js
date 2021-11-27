const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String },
    categorie: { type: String },
    saison: { type: String },
    provenance: { type: String }
});

autoIncrement.initialize(mongoose.connection);
ProductSchema.plugin(autoIncrement.plugin, {
    model: 'Product',
    field: 'id'
})

module.exports = mongoose.model('Product', ProductSchema);