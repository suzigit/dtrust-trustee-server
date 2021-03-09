const { ethers } = require('ethers');

const userWallet = new ethers.Wallet.createRandom();

const getMyId = () => {
    return "did:ethr:" + userWallet.address;
}

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
        tid: getMyId(),
        pbkey: userWallet.publicKey
      }

      return rootTrusteData;
  };

module.exports = signTrusteeCertificateAndPack;
