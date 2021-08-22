const { ethers } = require('ethers');

//const userWallet = new ethers.Wallet.createRandom();
var encyptedWallet = require('./asset/serverwallet.json');
const password = process.env.WALLET_PASS;
let userWallet = ethers.Wallet.fromEncryptedJsonSync(JSON.stringify(encyptedWallet), password);

const compressedPublicKey = ethers.utils.computePublicKey(
  userWallet.privateKey,
  true
);


const signTrusteeCertificateAndPack = async (subjectId, subjectName) => {

  const certificateBody =
  {
    subkey: subjectId,
    subnm: subjectName,
    iss: 1,
    iat: Date.now()
  };

  const signedCertificate = await userWallet.signMessage(JSON.stringify(certificateBody));

  const rootTrusteData = {
    certificate: certificateBody,
    sig: signedCertificate,
    signerId: compressedPublicKey
  }

  return rootTrusteData;
};

module.exports = signTrusteeCertificateAndPack;
