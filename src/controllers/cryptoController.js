const cryptoService = require('../services/cryptoService');

const getStats = async (req, res) => {
  const { coin } = req.query;
  try {
    const data = await cryptoService.getLatestCryptoData(coin);
    res.status(200).json({
      success: true,
      message: `Fetched stats for ${coin}`,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stats',
      error: error.message || 'Internal Server Error'
    });
  }
};

const getDeviation = async (req, res) => {
  const { coin } = req.query;
  try {
    const deviation = await cryptoService.getPriceDeviation(coin);
    res.status(200).json({
      success: true,
      message: `Price deviation fetched for ${coin}`,
      data: { deviation }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching deviation',
      error: error.message || 'Internal Server Error'
    });
  }
};

module.exports = { getStats, getDeviation };
