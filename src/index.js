const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');

const mongoUri = 'mongodb+srv://confioUser:csf123!@@cluster0.47woe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

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


const router = require('./routes/routes');

const requireAuth = require('./middlewares/requireAuth'); 

const app = express();

app.use(bodyParser.json());
app.use(router);


app.get('/', requireAuth, (req, res) => {
    const j = {"info": "chegou aqui no nodejs"};
    res.send(j);
})

app.listen(process.env.PORT || 3000, () => {
    console.log("listening on 30000");
})
