const express = require('express');
const mongoose = require('mongoose');
const AddressCertificate = mongoose.model('AddressCertificate');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth'); 



router.post('/test', requireAuth, async (req, res) => {

    const { certificateBody } = req.body;
    console.log(req.body);
    console.log(certificateBody);
    console.log(certificateBody["addressData"]);

    try {
        const ac = new AddressCertificate({
            addressData: certificateBody["addressData"], 
            signature: certificateBody["signature"]
        });
        console.log(ac);
        await ac.save();
        console.log("salvou");

        res.send('You made a request');
    } catch (err) {
        console.log("erro ao salvar dados");
        console.log(err);
        res.status(422).send("erro salvando o address certificate: " + err);
    }
})

module.exports = router;