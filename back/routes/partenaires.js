const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const config = require('../config');
const Partenaire = require('../models/Partenaire');

router.post('/add', [
    body('name').exists().isString(),
    body('contact').exists().isString(),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const _name = req.body.name;
    const _contact = req.body.contact;
    let newPartenaire = new Partenaire(data);
    await newPartenaire.save();
    return res.status(200);
});

router.put('/edit', [
    body('name').exists().isString(),
    body('contact')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const _name = req.body.name;
    if (body('contact').exists()) {
        if (Partenaire.countDocuments({ name: _name }, function(err, c) {
                if (c > 0) {
                    Partenaire.updateOne({ name: _name }, { contact: req.body.contact })
                }
            }));
    }
});

router.delete('/delete', [
    body('name').exists().isString(),
], (req, res) => {
    await Partenaire.deleteOne({ name: req.body.name }).exec();
    res.status(200).send();
}).catch((err) => {
    res.status(400);
});

module.exports = router;