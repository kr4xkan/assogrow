const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const JWT = require('jsonwebtoken');

const multer = require('multer');
const path = require('path');

const config = require('../config');
const User = require('../models/User');
const Dossier = require('../models/Dossier');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/")
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname)
	},
})
const upload = multer({
	storage,
	dest: path.join(__dirname, 'public/files/'),
	limits: { fileSize: 3500000 },
	fileFilter: (req, file, cb) => {
		const filetypes = /pdf/;
		const mimetype = filetypes.test(file.mimetype);
		const extname = filetypes.test(path.extname(file.originalname));

		if (mimetype && extname) {
			return cb(null, true);
		}

		return cb("The uploaded file, isn't compatible :( we're sorry");
	}
});

router.post('/upload/:id', upload.single('file'), async (req, res) => {
	Dossier.findOne({_id: req.params.id}, async (err, dos) => {
		if (err) {
			return res.status(404).send();
		}
		dos.pdf = req.file.path;
		await dos.save();
		res.status(200).send();
	});
});

router.post('/new', [
	body('nom').exists().isString(),
	body('prenom').exists().isString(),
	body('telephone').exists().isString()
], async (req, res) => {
	fetchUserByToken(req).then(async (user) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ error: errors.array() });
		}
		const _nom = req.body.nom;
		const _prenom = req.body.prenom;
		const _telephone = req.body.telephone;

		let data = {
			asso: user._id,
			nom: _nom,
			prenom: _prenom,
			telephone: _telephone,
			status: 0
		};

		let newProduct = new Dossier(data);
		await newProduct.save();
		res.status(200).send(newProduct._id);
	}).catch((err) => {
		res.status(401).json({ success: true, errors: err })
	})
});

router.put('/mark', [
	body('id').exists().isString(),
	body('status').exists().isNumeric()
], async(req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array() });
	}
	const _id = req.body.id;
	const _status = req.body.status;

	fetchUserByToken(req).then(async (user) => {
		Dossier.findOne({ _id }).exec(async (err, dos) => {
			if (err) {
				return res.status(400).json({ error: err });
			}

			if (!dos.asso.equals(user._id))
				return res.status(401).json({ success: false });
			
			dos.status = _status;
			await dos.save();

			res.status(200).json(dos);
		});
	});
});

router.get('/all', async(req, res) => {
    Dossier.find({}).populate('asso', 'username').exec((err, dos) => {
        if (err) {
            return res.status(400).json({ error: err });
        } else {
            res.status(200).json(dos);
        }
    });
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
