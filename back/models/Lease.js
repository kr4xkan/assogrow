const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeaseSchema = new Schema({
    asso: { type: mongoose.Types.ObjectId, ref: 'User' },
    dossier: { type: mongoose.Types.ObjectId, ref: 'Dossier' },
    item: { type: mongoose.Types.ObjectId, ref: 'Stocks' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lease', LeaseSchema);