const { map } = require('p-iteration');
const Trade = require('../models/trade.model');
const Security = require('../models/security.model');

module.exports = {

  getPortfolio: async (req, res, next) => {
    try {
      const portfolio = [];
      let trades;
      let securities = await Security.find().select('ticker -_id');
      securities = await securities.map(doc => doc.ticker);
      console.log(securities);
      securities = await map(securities, async (ticker) => {
        trades = await Trade.find({ ticker });
        portfolio.push({ [ticker]: [...trades] });
        return trades;
      });
      return res.json(portfolio);
      // console.log(securities, portfolio);
    } catch (error) {
      next(error);
    }
  },

};
