const mongoose = require('mongoose');

/*

      const certificateBody = 
        {
          trusteeId: getMyId(),
          trusteeName: myName,
          subjectId: subjectId,
          subjectName: subjectName,
          addressData: addressData,
          timestamp: new Date(),
          signature: 
        };  
*/


const addressCertificateSchema = new mongoose.Schema({

    addressData: {
        type: String,
        unique: true,
        required: true
    },
    signature: {
        type: String,
        unique: false,
        required: true
    }

});

mongoose.model ('AddressCertificate', addressCertificateSchema);