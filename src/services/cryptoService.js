
const axios = require('axios');

const COINS = ['bitcoin', 'matic-network', 'ethereum'];

const fetchCryptoData = async () => {
    try {
        const ids = COINS.join(',');
        const url = `https://api.coingecko.com/api/v3/coins/markets`;
        const response = await axios.get(url, {
            params: {
                vs_currency: 'usd',
                ids: ids,
                order: 'market_cap_desc',
                per_page: 3,
                page: 1,
                sparkline: false
            }
        });

        return response.data.map(coin => ({
            coin: coin.id,
            price: coin.current_price,
            marketCap: coin.market_cap,
            change24h: coin.price_change_percentage_24h
        }));


    } catch (error) {
        console.error('Error fetching crypto data:', error.message);
        return [];
    }
    
};

module.exports = fetchCryptoData;
