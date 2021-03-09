const express = require('express');
const mongoose = require('mongoose');
const AddressCertificate = mongoose.model('AddressCertificate');
const TrusteeCertificate = mongoose.model('TrusteeCertificate');
const RootTrusteeCertificateRequest = mongoose.model('RootTrusteeCertificateRequest');
const RootTrusteeCertificate = mongoose.model('RootTrusteeCertificate');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth'); 
const signTrusteeCertificateAndPack = require('../GenerateRootCertificate');

router.post('/saveAddressCertificate', requireAuth, async (req, res) => {

    console.log("saveAddressCertificate");

    const { certificateBody } = req.body;
    console.log(req.body);

    try {
        const obj = new AddressCertificate(certificateBody);
        await obj.save();

        const resp = {"status": certificateBody["addressData"] + " saved"};
        res.status(200).send(resp);
    } catch (err) {
        console.log(err);
        res.status(422).send("error saving address certificate: " + err);
    }
})


router.post('/saveTrusteeCertificate', requireAuth, async (req, res) => {

    console.log("saveTrusteeCertificate");

    const { certificateBody } = req.body;
    console.log(req.body);

    try {
        const obj = new TrusteeCertificate(certificateBody);
        await obj.save();

        const resp = {"status": certificateBody["subjectId"] + " saved"};
        res.status(200).send(resp);
    } catch (err) {
        console.log(err);
        res.status(422).send("error saving trustee certificate: " + err);
    }
})

// ******* ROOT TRUSTEE ****** //

router.post('/askRootTrustee', requireAuth, async (req, res) => {

    console.log("askRootTrustee");

    const { infoRootTrustee } = req.body;
    console.log(req.body);

    try {
        const obj = new RootTrusteeCertificateRequest(infoRootTrustee);
        await obj.save();
        res.status(200).send("OK");
    } catch (err) {
        console.log(err);
        res.status(422).send("error saving askRootTrustee: " + err);
    }
});


//THIS ROUTE WILL BE CALLED BY THE MANAGERS ONLY
router.post('/createCertificateRootTrustee', requireAuth, async (req, res) => {

    console.log("createCertificateRootTrustee");

    const { idInfoRootTrustee } = req.body;
    console.log(req.body);

    try {
        //get inforRootTrustee
        const rootTrusteeCertificateRequest = await RootTrusteeCertificateRequest.findById(idInfoRootTrustee).exec();
        console.log(rootTrusteeCertificateRequest);

        //generate a root certificate
        const certificate = await signTrusteeCertificateAndPack(rootTrusteeCertificateRequest.subjectId, 
            rootTrusteeCertificateRequest.subjectName);
        console.log("gerou certificado");
        console.log(certificate);

        //save the new certificate
        const obj = new RootTrusteeCertificate(certificate);
        await obj.save();
        res.status(200).send("OK");
        

    } catch (err) {
        console.log(err);
        res.status(422).send("error createCertificateRootTrustee: " + err);
    }    

});

router.get('/rootTrusteeCertificate', requireAuth, async (req, res) => {

    console.log("rootTrusteeCertificate");

    try {
        //get the most recent root trustee certificate
        let obj = await RootTrusteeCertificate.find({ "certificate.subkey": req.query.subjectId,
                    "certificate.subnm": req.query.subjectName
            }).sort({'certificate.iat':-1}).limit(1).exec();
        let jsonResult={"notFound":"true"};
        if (obj && obj.length!=0) {
            jsonResult=obj[0];
        }
        console.log(jsonResult);
        res.status(200).json(jsonResult);
    } catch (err) {
        console.log(err);
        res.status(422).send("error rootTrusteeCertificate: " + err);
    }  

});

module.exports = router;