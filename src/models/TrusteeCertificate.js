const mongoose = require('mongoose');

const trusteeCertificateSchema = new mongoose.Schema({

  sig: {
    type: String,
    required: true
  },
  data: {
    type: {
      subkey: {
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

mongoose.model ('TrusteeCertificate', trusteeCertificateSchema);