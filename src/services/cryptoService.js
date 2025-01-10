
const axios = require('axios');
const cryptoRepository = require('../repositories/cryptoRepository');

const fetchCryptoDataFromAPI = async (coin) => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
    params: {
      vs_currency: 'usd',
      ids: coin,
    },
  });
  return response.data[0];
};

const getLatestCryptoData = async (coin) => {
  return await cryptoRepository.getLatestCryptoData(coin);
};

const getPriceDeviation = async (coin) => {
  const records = await cryptoRepository.getPriceHistory(coin);
  const prices = records.map((record) => record.price);

  const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
  const deviation =
    Math.sqrt(
      prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) /
        prices.length
    ) || 0;
  return deviation;
};

const saveCryptoData = async (coin) => {
  const data = await fetchCryptoDataFromAPI(coin);
  await cryptoRepository.saveCryptoData(
    coin,
    data.current_price,
    data.market_cap,
    data.price_change_percentage_24h
  );
};

module.exports = { getLatestCryptoData, getPriceDeviation, saveCryptoData };
