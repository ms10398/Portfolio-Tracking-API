const mongoose = require('mongoose');

const securitySchema = new mongoose.Schema({
  ticker: {
    type: String,
    uppercase: true,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 100,
  },
});

module.exports = mongoose.model('Security', securitySchema);
