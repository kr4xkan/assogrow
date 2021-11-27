const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const JWT = require('jsonwebtoken');

const config = require('../config');
const Partenaire = require('../models/Partenaire');
const User = require('../models/User');
const Stock = require('../models/Stock');

router.get('/all', async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    fetchUserByToken(req).then(async(doc) => {
        let allStocks = await Stock.find({ asso: doc._id }).exec();
        return res.status(200).json(allStocks);
    })
    .catch(err => res.status(401).json({ err }));
})

router.get('/:id', async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const stockId = req.params.id;
    let stocks = await Stock.findOne({ _id: stockId }).exec();
    return res.status(200).json(stocks);
});

router.post('/add', [
    body('partenaire').exists().isString(),
    body('quantite').exists().isNumeric(),
    body('item').exists().isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const _partenaire = req.body.partenaire;
    const _quantite = req.body.quantite;
    const _item = req.body.item;
    fetchUserByToken(req).then(async(user) => {
        User.findOne({ name: user.name }).then(async(user) => {
            Partenaire.findOne({ _id: _partenaire }).then(async(partenaire) => {
                let data = {
                    partenaire: partenaire._id,
                    quantite: _quantite,
                    asso: user._id,
                    item: _item
                };
                let newStock = new Stock(data);
                await newStock.save();
                return res.status(200).json(data);
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({ err })
            });
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({ err })
        })
    }).catch((err) => {
        res.status(401).json({ success: false, errors: err })
    })
});

router.delete('/:id', (req, res) => {
    const stockId = req.params.id;
    fetchUserByToken(req).then(async(user) => {
        let stock = await Stock.findOne({ _id: stockId }).exec();
        if (stock.asso.equals(user._id)) {
            await Stock.deleteOne({ _id: stockId }).exec();
            res.status(200).send();
        } else {
            res.status(401).send();
        }
    }).catch((err) => {
        res.status(401).json({ success: false, errors: err });
    })
});

function fetchUserByToken(req) {
    return new Promise((resolve, reject) => {
        if (req.headers && req.headers.authorization) {
            let authorization = req.headers.authorization
            if (authorization.startsWith('Bearer ')) {
                authorization = authorization.slice(7, authorization.length)
            }
            let decoded
            try {
                decoded = JWT.verify(authorization, config.jwtsecret)
            } catch (e) {
                reject('Token unvalid, ' + e)
                return
            }
            User.findOne({ _id: decoded.id }, (err, doc) =>  {
                if (err) {
                    reject('Token error,' + err)
                }
                if (doc.accessToken == authorization)
                    resolve(doc)
                else
                    reject('Token unvalid')
            });
        } else {
            reject('No Token')
        }
    })
}

module.exports = router;