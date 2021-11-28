const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const JWT = require('jsonwebtoken');

const config = require('../config');
const Lease = require('../models/Lease');
const User = require('../models/User');

router.get('/all', async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    fetchUserByToken(req).then(async(doc) => {
        let allLeases = await Lease.find({ asso: doc._id }).exec();
        return res.status(200).json(allLeases);
    })
    .catch(err => res.status(401).json({ err }));
})

router.post('/add', [
    body('dossier').exists().isString(),
    body('item').exists().isString(),
    body('date').exists().isString()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const _dossier = req.body.dossier;
    const _item = req.body.item;
    const _date = req.body.date;
    fetchUserByToken(req).then(async (doc) => {
        let data = {
            asso: doc._id,
            dossier: _dossier,
            item: _item,
            date: _date
        };
        let newLease = new Lease(data);
        await newLease.save();
        return res.status(200).json(newLease);
    })
    .catch(err => res.status(401).json({ err }));
});

router.delete('/:id', (req, res) => {
    fetchUserByToken(req).then((doc) => {
            Lease.findOne({ _id: req.params.id }, async function(err, c) {
                if (err) {
                    return res.status(400).json({ err });
                }
                if (!doc){
                    return res.status(404).send();
                }
                
                if (!c.asso.equals(doc._id)) {
                    return res.status(401).send();
                }
                await Lease.deleteOne({ _id: req.params.id }).exec();
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