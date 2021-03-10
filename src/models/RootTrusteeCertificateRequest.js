const mongoose = require('mongoose');

const rootTrusteeCertificateRequestSchema = new mongoose.Schema({

    subjectId: {
      type: String,
      required: true
    },
    subjectName: {
      type: String,
      required: true
    },
    iat_server: {
      type: String,
      required: true
   } 
});

mongoose.model ('RootTrusteeCertificateRequest', rootTrusteeCertificateRequestSchema);