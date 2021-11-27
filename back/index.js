const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const config = require('./config');

const authRoute = require('./routes/auth');
const productRoute = require('./routes/products');

const port = 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoute);
app.use('/product', productRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
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