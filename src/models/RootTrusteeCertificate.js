const mongoose = require('mongoose');

const rootTrusteeCertificateSchema = new mongoose.Schema({

      signerId: {
        type: String,
        required: true
      },
      sig: {
          type: String,
          required: true
      },
      certificate: {
        type: {
          subkey: {
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
      },
      iat_server: {
        type: String,
        required: true
     }     

});




mongoose.model ('RootTrusteeCertificate', rootTrusteeCertificateSchema);
