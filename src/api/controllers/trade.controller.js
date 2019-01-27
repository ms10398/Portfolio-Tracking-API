const httpStatus = require('http-status');
const Trade = require('../models/trade.model');
const Security = require('../models/security.model');
const Portfolio = require('../models/portfolio.model');

// This function can be moved to helpers/util folder
async function buySecurity(securityObj, req, portfolio, ticker, quantity) {
  const { price } = securityObj;
  req.body = { price, ...req.body };
  // Fetching if the ticker is already present in portfolio
  portfolio = await Portfolio.findOne({ ticker });
  // Checking if the portfolio[ticker] has any value
  if (portfolio) {
    // Calculating Average buy price using weighted average
    const weight = portfolio.avgBuyPrice * portfolio.quantity + quantity * price;
    portfolio.avgBuyPrice = weight / (portfolio.quantity + quantity);
    portfolio.quantity += quantity;
    // Updating Portfolio with new trade
    portfolio = await Portfolio.findOneAndUpdate({ ticker }, portfolio, { new: true });
  } else {
    // If the ticker is not present then make a new entry in Portfolio for the ticker
    portfolio = new Portfolio({ ticker, quantity, avgBuyPrice: price });
    portfolio = await portfolio.save();
  }
  return portfolio;
}

module.exports = {
  addTrade: async (req, res, next) => {
    try {
      const { ticker, action, quantity } = req.body;
      let portfolio;
      // Fetching security price with the ticker
      const securityObj = await Security.findOne({ ticker }).select('price');
      // If the security is present in DB proceed with it
      if (securityObj) {
        // If it is a buy request
        if (action === 'buy') {
          portfolio = await buySecurity(securityObj, req, portfolio, ticker, quantity);
          // If the action is sell
        } else if (action === 'sell') {
          const { price } = securityObj;
          req.body = { price, ...req.body };
          // Fetching if the ticker is present in Portfolio
          portfolio = await Portfolio.findOne({ ticker });
          // Checking if portfolio[ticker] has anything
          if (portfolio) {
            // Checking if the portfolio has enough quantity to be sold
            if (portfolio.quantity >= quantity) {
              portfolio.quantity -= quantity;
              // Updating Portfolio accordingly
              portfolio = portfolio.quantity === 0
                ? await Portfolio.remove({ ticker })
                : await Portfolio.findOneAndUpdate({ ticker }, portfolio, { new: true });
            } else {
              res.status(httpStatus.BAD_REQUEST);
              return res.json({
                message: "Sorry, You don't have enough stocks in your portfolio.",
              });
            }
          } else {
            res.status(httpStatus.BAD_REQUEST);
            return res.json({ message: "Sorry, You don't have the security in your portfolio." });
          }
        }
      } else {
        res.status(httpStatus.BAD_REQUEST);
        return res.json({ message: 'Your security is not listed on our platform.' });
      }
      // Recording trade if the trade was successful
      let trade = new Trade(req.body);
      trade = await trade.save();
      return res.json(trade);
    } catch (error) {
      next(error);
    }
  },
  updateTrade: async (req, res, next) => {
    try {
      let trade = await Trade.findById({ _id: req.params.id });
      if (trade) {
        const {
          action, price, ticker, quantity,
        } = trade;
        const { updatedQuantity } = req.body;
        if (updatedQuantity === quantity) {
          return res.json({ message: 'The quantity provided is same as before.' });
        }
        let newPrice;
        const securityObj = await Security.findOne({ ticker }).select('price');
        const currPrice = securityObj.price;
        let portfolio = await Portfolio.findOne({ ticker });
        let change;
        if (portfolio) {
          if (action === 'buy') {
            if (updatedQuantity > quantity) {
              change = updatedQuantity - quantity;
              const weight = portfolio.avgBuyPrice * portfolio.quantity + change * currPrice;
              newPrice = (quantity * price + change * currPrice) / (quantity + change);
              portfolio.avgBuyPrice = weight / (portfolio.quantity + change);
              portfolio.quantity += change;
              portfolio = await Portfolio.findOneAndUpdate({ ticker }, portfolio, { new: true });
            } else if (updatedQuantity < quantity) {
              newPrice = price;
              change = quantity - updatedQuantity;
              portfolio.quantity -= change;
              portfolio = await Portfolio.findOneAndUpdate({ ticker }, portfolio, { new: true });
            }
          } else if (action === 'sell') {
            if (updatedQuantity > quantity) {
              change = updatedQuantity - quantity;
              if (change > portfolio.quantity) {
                res.status(httpStatus.BAD_REQUEST);
                return res.json({ message: 'Trade cannot be updated with the given value' });
              }
              newPrice = price;
              portfolio.quantity -= change;
              portfolio = portfolio.quantity === 0
                ? await Portfolio.remove({ ticker })
                : await Portfolio.findOneAndUpdate({ ticker }, portfolio, { new: true });
            } else if (updatedQuantity < quantity) {
              newPrice = price;
              change = quantity - updatedQuantity;
              portfolio.quantity += change;
              portfolio = await Portfolio.findOneAndUpdate({ ticker }, portfolio, { new: true });
            }
          }
        }
        if (!portfolio && action === 'sell' && updatedQuantity < quantity) {
          change = quantity - updatedQuantity;
          portfolio = new Portfolio({ ticker, quantity: change, avgBuyPrice: price });
          portfolio = await portfolio.save();
        }
        trade.price = newPrice;
        trade.quantity = updatedQuantity;
        trade = await Trade.findOneAndUpdate({ _id: req.params.id }, trade, { new: true });
        return res.json(trade);
      }
      res.status(httpStatus.BAD_REQUEST);
      return res.json({ message: 'There is no trade registered with the given id' });
    } catch (error) {
      next(error);
    }
  },
  removeTrade: async (req, res, next) => {
    try {
      // Removing trade if it was present in the database
      const trade = await Trade.findByIdAndDelete(req.params.id);
      // Checking if trade was removed
      if (trade) {
        return res.json({ message: 'Trade removed successfully.' });
      }
      res.status(httpStatus.BAD_REQUEST);
      return res.json({ message: 'Request was not completed successfully.' });
    } catch (error) {
      next(error);
    }
  },
};
