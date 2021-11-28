const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const config = require('./config');

const authRoute = require('./routes/auth');
const productRoute = require('./routes/products');
const dossierRoute = require('./routes/dossier');
const stocksRoute = require('./routes/stocks');
const partenairesRoute = require('./routes/partenaires');
const leaseRoute = require('./routes/lease');

const port = 3000;

app.use(cors())

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/dossier', dossierRoute);
app.use('/stocks', stocksRoute);
app.use('/partenaires', partenairesRoute);
app.use('/lease', leaseRoute);

app.get('/', (req, res) => {
    res.send('HACKATON');
})

connect();

function listen() {
    app.listen(port, () => {
        console.log(`HACKATON RUNNING ON http://localhost:${port}`);
    })
}

function connect() {
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', listen);
    return mongoose.connect(config.db, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}