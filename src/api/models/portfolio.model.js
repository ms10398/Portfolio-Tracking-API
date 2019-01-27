const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  ticker: {
    type: String,
    uppercase: true,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
  avgBuyPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
