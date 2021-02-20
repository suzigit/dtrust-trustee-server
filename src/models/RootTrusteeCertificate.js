const mongoose = require('mongoose');

const rootTrusteeCertificateSchema = new mongoose.Schema({

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

mongoose.model ('RootTrusteeCertificate', rootTrusteeCertificateSchema);