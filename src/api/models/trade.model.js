const mongoose = require('mongoose');
// const httpStatus = require('http-status');

const tradeSchema = new mongoose.Schema({
  ticker: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Trade', tradeSchema);
