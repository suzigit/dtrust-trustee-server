const { ethers } = require('ethers');

const userWallet = new ethers.Wallet.createRandom();

const getMyId = () => {
    return "did:ethr:" + userWallet.address;
}

const signTrusteeCertificate = async (subjectId, subjectName) => {

    const certificateBody = 
      {
        trusteeId: getMyId(),
        trusteeName: "TRUSTEE MASTER",
        subjectId: subjectId,
        subjectName: subjectName,
        timestamp: new Date()
      };

      const signedCertificate = await userWallet.signMessage(JSON.stringify(certificateBody));

      certificateBody["signature"] = signedCertificate;

      return certificateBody;
  };

module.exports = signTrusteeCertificate;
