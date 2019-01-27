const express = require('express');
const tradeRoutes = require('./trade.route');
const securityRoutes = require('./security.route');
const portfolioRoutes = require('./portfolio.route');
const swagger = require('./swagger');

const router = express.Router();

// Status route to check if API is running or not
router.get('/status', (req, res) => res.send('API is up & running'));
// All trade routes
router.use('/trade', tradeRoutes);
// All security routes
router.use('/security', securityRoutes);
// All portfolio routes
router.use('/portfolio', portfolioRoutes);
// Swagger doc routes
router.use('/docs', swagger);

module.exports = router;
