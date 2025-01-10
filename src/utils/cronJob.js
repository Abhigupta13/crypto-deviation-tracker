const cron = require('node-cron');
const { fetchCryptoData, storeCryptoData } = require('./cryptoHelper'); 

// Schedule the job to run every 2 hours (cron syntax: '0 */2 * * *')
const startCronJob = () => {
  cron.schedule('0 */2 * * *', async () => {
    console.log('Fetching crypto data...');

    for (const coin of ['bitcoin', 'matic-network', 'ethereum']) {
      const data = await fetchCryptoData(coin);
      await storeCryptoData(data);
    }

    console.log('Data fetching and storing completed!');
  });
};

module.exports = startCronJob;  
