const CryptoData = require('../models/CryptoData');

const saveCryptoData = async (coin, price, marketCap, change24h) => {
  const newCryptoData = new CryptoData({
    coin,
    price,
    marketCap,
    change24h,
  });
  await newCryptoData.save();
};

const getLatestCryptoData = async (coin) => {
  return await CryptoData.findOne({ coin }).sort({ timestamp: -1 }).exec();
};

const getPriceHistory = async (coin) => {
  return await CryptoData.find({ coin }).sort({ timestamp: -1 }).limit(100);
};

module.exports = { saveCryptoData, getLatestCryptoData, getPriceHistory };
