const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const mongoUriIni = 'mongodb+srv://';
const mongoUser = process.env.BD_USER;
const mongoPass = process.env.BD_PASS;
const mongoUriEnd = '@cluster0.47woe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const mongoUri = mongoUriIni + mongoUser + ":" + mongoPass + mongoUriEnd;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log("connected to mongo instance");
})
mongoose.connection.on('error', (err) => {
    console.log("error connecting mongo", err);
})

require('./models/AddressCertificate');
require('./models/TrusteeCertificate');
require('./models/RootTrusteeCertificateRequest');
require('./models/RootTrusteeCertificate');

const router = require('./routes/routes');

const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(router);


app.get('/', requireAuth, (req, res) => {
    const j = { "info": "chegou aqui no nodejs" };
    res.send(j);
})

app.listen(process.env.PORT || 3000, () => {
    console.log("listening on 30000");
})
