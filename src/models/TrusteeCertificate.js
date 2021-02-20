const mongoose = require('mongoose');

/*

      const certificateBody = 
        {
          trusteeId: getMyId(),
          trusteeName: myName,
          subjectId: subjectId,
          subjectName: subjectName,
          timestamp: new Date()
            signature: 

        };  
*/


const trusteeCertificateSchema = new mongoose.Schema({

    trusteeId: {
      type: String,
      required: true
    },
    trusteeName: {
      type: String,
      required: true
    },
    subjectId: {
      type: String,
      required: true
    },
    subjectName: {
      type: String,
      required: true
    },
    timestamp: {
        type: String,
        required: true    
    },
    signature: {
        type: String,
        required: true
    }

});

mongoose.model ('TrusteeCertificate', trusteeCertificateSchema);