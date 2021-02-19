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


const router = require('./routes/authRootTrustee');
const requireAuth = require('./middlewares/requireAuth'); 

const app = express();

app.use(bodyParser.json());
app.use(router);


app.get('/', requireAuth, (req, res) => {
    res.send('hi there');
})

app.listen(3000, () => {
    console.log("listening on 30000");

})
