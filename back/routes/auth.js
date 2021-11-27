const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const config = require('../config');
const User = require('../models/User');

router.post('/register', [
    body('name').exists().isString(),
    body('siret').exists().isString(),
    body('address').exists().isString(),
    body('email').exists().isEmail(),
    body('password').exists()
	// .isHash('sha256')
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const _name = req.body.name;
    const _siret = req.body.siret;
    const _address = req.body.address;
    const _password = req.body.password;
    const _email = req.body.email;

    let siretCount = await User.countDocuments({siret: _siret}).exec();
    let emailCount = await User.countDocuments({email: _email}).exec();

	if (siretCount != 0) {
        return res.status(400).json({ error: "siret" });
	}
	if (emailCount != 0) {
        return res.status(400).json({ error: "email" });
	}

    let salt = crypto.randomBytes(64).toString('base64');
    let hashedPassword = crypto.pbkdf2Sync(_password, salt, config.crypto.iterations, config.crypto.size, config.crypto.digest).toString('base64');

    let willSend = {
		siret: _siret,
		name: _name,
		address: _address,
        email: _email
    };

    let newUser = new User({
        ...willSend,
        password: `${salt}:${hashedPassword}`
    })
    await newUser.save();

    res.status(200).json(willSend);
});

router.post('/login', [
    body('email').exists().isString(),
    body('password').exists()
	// .isHash('sha256')
], async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const _email = req.body.email
    const _password = req.body.password

    User.findOne({email: _email}).then(async (user) => {
        if (!user)
            return res.status(404).send()

		let split = user.password.split(':')
        let tmpPassword = crypto.pbkdf2Sync(_password, split[0], config.crypto.iterations, config.crypto.size, config.crypto.digest).toString('base64')
        
        if (tmpPassword === split[1]) {
            res.status(200).json({
                siret: user.siret,
                name: user.name,
                address: user.address,
                email: user.email
            })
        } else {
            res.status(400).json({ error: "password" })
        }
    }).catch((err) => {
		console.error(err);
		return res.status(500).json({ err })
    })
})

router.post('/test', async (req, res) => {
	res.json(req.body);
});

router.delete('/test', async (req, res) => {
	await User.deleteOne({email: req.body.email});
	res.status(200).send();
});

router.get('/test', async (_, res) => {
	const users = await User.find({}).exec();
	res.json(users);
});

module.exports = router;
