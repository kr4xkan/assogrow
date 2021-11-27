const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const JWT = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/User');
const Product = require('../models/Product');

router.post('/publish', [
    body('name').exists().isString(),
    body('desc').exists().isString(),
    body('location').exists().isString(),
    body('price').exists().isNumeric(),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const _name = req.body.name;
    const _desc = req.body.desc;
    const _location = req.body.location;
    const _price = req.body.price;

    fetchUserByToken(req).then(async (user) => {
        let data = {
            name: _name,
            owner: user._id,
            location: _location,
            desc: _desc,
            price: _price
        };
        let newProduct = new Product(data);
        await newProduct.save();
        res.status(200).json(data);
    }).catch((err) => {
        res.status(401).json({ success: false, errors: err })
    })
});

router.get('/search', [
    body('query').exists().isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const _query = req.body.query;
    Product.find({"name": { "$regex": _query }}).populate('owner', 'username').exec((err, products) => {
        if (err) {
            return res.status(500).json({err});
        }
        products.each((v) => { v.user = v.user.name });
        return res.json(products);
    });
});

router.get('/all', async(req, res) => {
    Product.find({}).populate('owner', 'username').exec((err, products) => {
        if (err) {
            return res.status(400).json({ error: err });
        } else {
            res.status(200).json(products);
        }
    });
});

router.get('/:id', (req, res) => {
    const productId = req.params.id;

    fetchUserByToken(req).then(async (user) => {
        
        Product.findOne({_id: productId}).populate('owner', 'username').exec((err, product) => {
            if (err) {
                return res.status(500).json({err});
            }
            res.status(200).json(product);
        });
    }).catch((err) => {
        res.status(401).json({ success: false, errors: err })
    })
});

router.delete('/:id', (req, res) => {
    const productId = req.params.id;
    fetchUserByToken(req).then(async (user) => {
        let product = await Product.findOne({_id: productId}).exec();
        if (product.owner = user._id) {
            await Product.deleteOne({_id: productId}).exec();
            res.status(200).send();
        } else {
            res.status(401).send();
        }
    }).catch((err) => {
        res.status(401).json({ success: false, errors: err });
    })
});

function fetchUserByToken(req) {
    return new Promise((resolve,reject) => {
        if(req.headers && req.headers.authorization) {
            let authorization = req.headers.authorization
            if (authorization.startsWith('Bearer ')) {
                authorization = authorization.slice(7, authorization.length)
            }
            let decoded
            try {
                decoded = JWT.verify(authorization, config.jwtsecret)
            } catch (e) {
                reject('Token unvalid, '+e)
                return
            }
            User.findOne({_id: decoded.id}, (err, doc) => {
                if (err) {
                    reject('Token error,'+err)
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