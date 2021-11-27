const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StocksSchema = new Schema({
    partenaire: { type: mongoose.Schema.Types.ObjectId, ref: 'Partenaire' },
    quantite: { type: Number },
    item: { type: String },
    asso: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Stocks', StocksSchema);