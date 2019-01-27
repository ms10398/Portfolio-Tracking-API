const { map } = require('p-iteration');
const Trade = require('../models/trade.model');
const Security = require('../models/security.model');
const Portfolio = require('../models/portfolio.model');

module.exports = {
  getPortfolio: async (req, res, next) => {
    try {
      const portfolio = [];
      let trades;
      let securities = await Security.find().select('ticker -_id');
      securities = await securities.map(doc => doc.ticker);
      securities = await map(securities, async (ticker) => {
        trades = await Trade.find({ ticker });
        portfolio.push({ [ticker]: [...trades] });
        return trades;
      });
      console.log(securities);
      return res.json(portfolio);
    } catch (error) {
      next(error);
    }
  },
  getHoldings: async (req, res, next) => {
    try {
      const portfolio = await Portfolio.find();
      return res.json(portfolio);
    } catch (error) {
      next(error);
    }
  },
  getReturns: async (req, res, next) => {
    try {
      let portfolio = await Portfolio.find();
      console.log(portfolio);
      let sum = 0; let ticker;
      portfolio = await map(portfolio, async (stock) => {
        ticker = await Security.find({ ticker: stock.ticker });
        sum += (ticker[0].price - stock.avgBuyPrice) * stock.quantity;
        return stock;
      });
      return res.json({ Returns: sum });
    } catch (error) {
      next(error);
    }
  },
};
