
const Crypto = require('../models/Crypto');
const calculateStandardDeviation = require('../utils/calculateDeviation');


const getStats = async (req, res) => {
    const { coin } = req.query;

    if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
        return res.status(400).json({ error: 'Invalid or missing coin parameter' });
    }

    try {
        const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
        

        if (!latestData) {
            return res.status(404).json({ error: 'No data found for the specified coin' });
        }

    
        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h
        });
    } catch (error) {
        console.error('Error fetching stats:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};


const getDeviation = async (req, res) => {
    const { coin } = req.query;

    if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
        return res.status(400).json({ error: 'Invalid or missing coin parameter' });
    }

    try {
        const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100).select('price');

        if (records.length === 0) {
            return res.status(404).json({ error: 'No data found for the specified coin' });
        }

        const prices = records.map(record => record.price);
        const deviation = calculateStandardDeviation(prices);

        res.json({ deviation: parseFloat(deviation.toFixed(2)) });
    } catch (error) {
        console.error('Error fetching deviation:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getStats, getDeviation };
