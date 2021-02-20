const express = require('express');
const mongoose = require('mongoose');
const AddressCertificate = mongoose.model('AddressCertificate');
const TrusteeCertificate = mongoose.model('TrusteeCertificate');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth'); 

router.post('/saveAddressCertificate', requireAuth, async (req, res) => {

    console.log("saveAddressCertificate");

    const { certificateBody } = req.body;
    console.log(req.body);

    try {
/*
        const ac = new AddressCertificate({
            trusteeId: certificateBody["trusteeId"],
            trusteeName: certificateBody["trusteeName"],
            subjectId: certificateBody["subjectId"],
            subjectName: certificateBody["subjectName"],
            addressData: certificateBody["addressData"], 
            timestamp: certificateBody["timestamp"],
            signature: certificateBody["signature"],
        });
*/
        const ac = new AddressCertificate(certificateBody);
        await ac.save();

        const resp = {"status": certificateBody["addressData"] + " saved"};
        res.status(200).send(resp);
    } catch (err) {
        console.log(err);
        res.status(422).send("error savind address certificate: " + err);
    }
})


router.post('/saveTrusteeCertificate', requireAuth, async (req, res) => {

    console.log("saveTrusteeCertificate");

    const { certificateBody } = req.body;
    console.log(req.body);

    try {
        const ac = new TrusteeCertificate(certificateBody);
        await ac.save();

        const resp = {"status": certificateBody["subjectId"] + " saved"};
        res.status(200).send(resp);
    } catch (err) {
        console.log(err);
        res.status(422).send("error savind trustee certificate: " + err);
    }
})


router.post('/authRootTrustee', requireAuth, async (req, res) => {


})

module.exports = router;