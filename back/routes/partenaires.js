const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const JWT = require('jsonwebtoken');

const config = require('../config');
const Partenaire = require('../models/Partenaire');
const User = require('../models/User');

router.get('/all', async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    fetchUserByToken(req).then(async(doc) => {
        let allPartenaires = await Partenaire.find({ asso: doc._id }).exec();
        return res.status(200).json(allPartenaires);
    })
    .catch(err => res.status(401).json({ err }));
})

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
    fetchUserByToken(req).then(async (doc) => {
        let data = {
            asso: doc._id,
            name: _name,
            contact: _contact
        };
        let newPartenaire = new Partenaire(data);
        await newPartenaire.save();
        return res.status(200).json(newPartenaire);
    })
    .catch(err => res.status(401).json({ err }));
});

router.put('/:id', [
    body('name').exists().isString(),
    body('contact').exists()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const _name = req.body.name;
    const _contact = req.body.contact;

    fetchUserByToken(req).then((doc) => {
            Partenaire.findOne({ _id: req.params.id }, async function(err, c) {
                if (err) {
                    return res.status(400).json({ error: errors.array() });
                }
                if (!c.asso.equals(doc._id)) {
                    return res.status(401).json({m:"NOOO"});
                }
                c.contact = _contact;
                c.name = _name;
                await c.save();
                res.status(200).json(c);
            });
        })
        .catch(err => res.status(401).json({ error: err }));
});

router.delete('/:id', [
    body('name').exists().isString(),
], (req, res) => {
    fetchUserByToken(req).then((doc) => {
            Partenaire.findOne({ _id: req.params.id }, async function(err, c) {
                if (err) {
                    return res.status(400).json({ err });
                }
                if (!doc){
                    return res.status(404).send();
                }
                
                if (!c.asso.equals(doc._id)) {
                    return res.status(401).send();
                }
                await Partenaire.deleteOne({ _id: req.params.id }).exec();
                res.status(200).send();
            });
        })
        .catch(err => res.status(401).json({ err }));
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
            User.findOne({ _id: decoded.id }, (err, doc) => ??{
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