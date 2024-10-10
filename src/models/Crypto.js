
const mongoose = require('mongoose');

const CryptoSchema = new mongoose.Schema({
    coin: {
        type: String,
        enum: ['bitcoin', 'matic-network', 'ethereum'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    marketCap: {
        type: Number,
        required: true
    },
    change24h: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Crypto', CryptoSchema);
