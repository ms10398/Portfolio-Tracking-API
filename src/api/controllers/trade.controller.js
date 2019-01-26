const httpStatus = require('http-status');
const Trade = require('../models/trade.model');
const Security = require('../models/security.model');
const Portfolio = require('../models/portfolio.model');

module.exports = {
  addTrade: async (req, res, next) => {
    console.log(req.body);
    try {
      const { ticker, action, quantity } = req.body;
      let portfolio;
      const securityObj = await Security.findOne({ ticker }).select('price');
      if (securityObj) {
        if (action === 'buy') {
          const { price } = securityObj;
          req.body = { price, ...req.body };
          portfolio = await Portfolio.findOne({ ticker });
          if (portfolio) {
            const weight = (portfolio.avgBuyPrice * portfolio.quantity + quantity * price);
            portfolio.avgBuyPrice = weight / (portfolio.quantity + quantity);
            portfolio.quantity += quantity;
            portfolio = await Portfolio.findOneAndUpdate({ ticker }, portfolio, { new: true });
          } else {
            portfolio = new Portfolio({ ticker, quantity, avgBuyPrice: price });
            portfolio = await portfolio.save();
          }
        } else if (action === 'sell') {
          const { price } = securityObj;
          req.body = { price, ...req.body };
          portfolio = await Portfolio.findOne({ ticker });
          if (portfolio) {
            if (portfolio.quantity >= quantity) {
              portfolio.quantity -= quantity;
              portfolio = portfolio.quantity === 0 ? await Portfolio
                .remove({ ticker })
                : await Portfolio
                  .findOneAndUpdate({ ticker }, portfolio, { new: true });
            } else {
              res.status(httpStatus.BAD_REQUEST);
              return res.json({ message: 'Sorry, You don\'t have enough stocks in your portfolio.' });
            }
          } else {
            res.status(httpStatus.BAD_REQUEST);
            return res.json({ message: 'Sorry, You don\'t have the security in your portfolio.' });
          }
        }
      } else {
        res.status(httpStatus.BAD_REQUEST);
        return res.json({ message: 'Your security is not listed on our platform.' });
      }
      let trade = new Trade(req.body);
      trade = await trade.save();
      return res.json(trade);
    } catch (error) {
      next(error);
    }
  },
  removeTrade: async (req, res, next) => {
    try {
      const trade = await Trade.findByIdAndDelete(req.param.id);
      console.log(trade);
    } catch (error) {
      next(error);
    }
  },
};
