const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DossierSchema = new Schema({
    asso: { type: mongoose.Types.ObjectId, ref: 'User' },
    nom: { type: String },
    prenom: { type: String },
    telephone: { type: String },
    pdf: { type: String },
    status: { type: Number },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dossier', DossierSchema);