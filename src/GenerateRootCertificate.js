const { ethers } = require('ethers');

const userWallet = new ethers.Wallet.createRandom();


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
