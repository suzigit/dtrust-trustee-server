const mongoose = require('mongoose');

const rootTrusteeCertificateSchema = new mongoose.Schema({

      tid: {
        type: String,
        required: true
      },
      pbkey: {
        type: String,
        required: true
      },
      sig: {
          type: String,
          required: true
      },
      certificate: {
        type: {
          sub: {
            type: String,
            required: true
          },
          subnm: {
            type: String,
            required: false
          },
          iss: {
            type: Number,
            required: true
          },      
          iat: {
              type: String,
              required: true    
          }
        },
        required: true 
      }
});




mongoose.model ('RootTrusteeCertificate', rootTrusteeCertificateSchema);