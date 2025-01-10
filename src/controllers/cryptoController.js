// src/controllers/cryptoController.js
const cryptoService = require('../services/cryptoService');

const getStats = async (req, res) => {
  const { coin } = req.query;
  try {
    const data = await cryptoService.getLatestCryptoData(coin);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stats' });
  }
};

const getDeviation = async (req, res) => {
  const { coin } = req.query;
  try {
    const deviation = await cryptoService.getPriceDeviation(coin);
    res.json({ deviation });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching deviation' });
  }
};

module.exports = { getStats, getDeviation };
