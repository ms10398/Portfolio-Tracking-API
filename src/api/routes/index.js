const express = require('express');
const tradeRoutes = require('./trade.route');
const swagger = require('./swagger');

const router = express.Router();

/**
 * GET status
 */
router.get('/status', (req, res) => res.send('API is up & running'));

router.use('/users', tradeRoutes);

router.use('/docs', swagger);

module.exports = router;
