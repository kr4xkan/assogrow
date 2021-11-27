const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const config = require('../config');
const Product = require('../models/Product');

router.get('/all', async(req, res) => {
    Product.find({}, function(err, resa) {
        if (err) {
            return res.status(400).json({ error: err });
        } else {
            res.status(200).json(resa);
        }
    });
});

router.delete('/delete', [
    body('id').exists().isString()
], async(req, res) => {
    const _id = parseInt(req.body.id);
    Product.findOne({ id: _id }, function(err, resa) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        if (!resa) {
            return res.send(404);
        } else {
            resa.remove(function(err) {
                if (err) {
                    return res.status(400).json({ error: err });
                }
                return res.send(204);
            });
        }
    });
});

router.post('/new', [
    body('provenance').exists().isString(),
    body('saison').exists().isString(),
    body('categorie').exists().isString(),
    body('name').exists().isString()
], async(req, res) => {
    const _name = req.body.name;
    const _saison = req.body.saison;
    const _categorie = req.body.categorie;
    const _provenance = req.body.provenance;
    let newProduct = new Product({
        name: _name,
        categorie: _categorie,
        saison: _saison,
        provenance: _provenance
    })
    await newProduct.save();
    res.status(200).send();
});

router.put('/update', [
    body('provenance').exists().isString(),
    body('saison').exists().isString(),
    body('categorie').exists().isString(),
    body('name').exists().isString(),
    body('id').exists().isString()
], async(req, res) => {

    const _name = req.body.name;
    const _saison = req.body.saison;
    const _categorie = req.body.categorie;
    const _provenance = req.body.provenance;
    const _id = parseInt(req.body.id);

    let product = Product.findOne({ id: _id }).then(async(user) => {
        if (!user)
            return res.status(404).send();
        if (product.name != _name && _name != "") {
            Product.updateOne({ id: _id }, { name: _name });
        }
        if (product.saison != _saison && _saison != "") {
            Product.updateOne({ id: _id }, { name: _saison });
        }
        if (product.categorie != _categorie && _categorie != "") {
            Product.updateOne({ id: _id }, { name: _categorie });
        }
        if (product.provenance != _provenance && _provenance != "") {
            Product.updateOne({ id: _id }, { name: _provenance });
        }
        res.send(200);
    });

    let newProduct = new Product({
        name: _name,
        categorie: _categorie,
        saison: _saison,
        provenance: _provenance
    })
    await newProduct.save();
    res.status(200).send();
});

module.exports = router;