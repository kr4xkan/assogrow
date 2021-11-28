const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const JWT = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/User');

router.post('/register', [
    body('username').exists().isString(),
    body('email').exists().isEmail(),
    body('password').exists()
	// .isHash('sha256')
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const _username = req.body.username;
    const _password = req.body.password;
    const _email = req.body.email;

    let emailCount = await User.countDocuments({email: _email}).exec();

	if (emailCount != 0) {
        return res.status(400).json({ error: "exists" });
	}

    let salt = crypto.randomBytes(64).toString('base64');
    let hashedPassword = crypto.pbkdf2Sync(_password, salt, config.crypto.iterations, config.crypto.size, config.crypto.digest).toString('base64');

    let willSend = {
		username: _username,
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

            let accessToken = JWT.sign({id: user._id}, config.jwtsecret, {expiresIn: '42h', algorithm: 'HS256'})
            user.accessToken = accessToken;
            await user.save()

            res.status(200).json({
                address: user.address,
                email: user.email,
                accessToken
            })
        } else {
            res.status(400).json({ error: "password" })
        }
    }).catch((err) => {
		console.error(err);
		return res.status(500).json({ err })
    })
})

module.exports = router;
