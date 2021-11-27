const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    location: { type: String },
    price: { type: Number },
    desc: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);