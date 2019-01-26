const express = require('express');
const tradeRoutes = require('./trade.route');
const securityRoutes = require('./security.route');
const portfolioRoutes = require('./portfolio.route');
const swagger = require('./swagger');

const router = express.Router();

/**
 * GET status
 */
router.get('/status', (req, res) => res.send('API is up & running'));

router.use('/trade', tradeRoutes);
router.use('/security', securityRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/docs', swagger);

module.exports = router;
