
const cron = require('node-cron');
const Crypto = require('../models/Crypto');
const fetchCryptoData = require('../services/cryptoService');

const startCryptoDataJob = () => {
   
    cron.schedule('0 */2 * * *', async () => {
        console.log('Fetching crypto data...');
        const data = await fetchCryptoData();

        if (data.length > 0) {
            try {
                await Crypto.insertMany(data);
                console.log('Crypto data saved successfully');
            } catch (error) {
                console.error('Error saving crypto data:', error.message);
            }
        }
    });

    console.log('Crypto data job scheduled to run every 2 hours');
};

module.exports = startCryptoDataJob;
