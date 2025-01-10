const axios = require('axios');
const CryptoData = require('../models/CryptoData');
require('dotenv').config();

const COINS = ['bitcoin', 'matic-network', 'ethereum'];
const API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const API_KEY = process.env.API_KEY; 

// Function to fetch cryptocurrency data from CoinGecko
const fetchCryptoData = async (coin) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        ids: coin,
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true',
        x_cg_demo_api_key: API_KEY,  
      },
    });

    const data = response.data[coin];
    return {
      coin: coin,
      price: data.usd,
      marketCap: data.usd_market_cap,
      change24h: data.usd_24h_change,
    };
  } catch (error) {
    console.error(`Error fetching data for ${coin}:`, error.message);
    return null;
  }
};

// Function to store fetched data in MongoDB
const storeCryptoData = async (data) => {
    if (data) {
      
      const newRecord = new CryptoData(data);
      await newRecord.save();
  
      console.log(`${data.coin} data stored successfully`);
    }
  };
  

module.exports = { fetchCryptoData, storeCryptoData };
