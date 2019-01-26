const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  ticker: {
    type: String,
    uppercase: true,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    enum: ['buy', 'sell'],
    lowercase: true,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    min: 0,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model('Trade', tradeSchema);
