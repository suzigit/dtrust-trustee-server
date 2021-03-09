const mongoose = require('mongoose');


const addressCertificateSchema = new mongoose.Schema({


  sig: {
    type: String,
    required: true
  },
  data: {
    type: {
      subdid: {
        type: String,
        required: true
      },
      subnm: {
        type: String,
        required: false
      },
      addr: {
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

mongoose.model ('AddressCertificate', addressCertificateSchema);