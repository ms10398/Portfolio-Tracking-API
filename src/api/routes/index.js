const express = require('express');
const tradeRoutes = require('./trade.route');

const router = express.Router();

/**
 * GET status
 */
router.get('/status', (req, res) => res.send('API is up & running'));

router.use('/users', tradeRoutes);

module.exports = router;
