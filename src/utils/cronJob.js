// src/utils/cronJob.js
const cron = require('node-cron');
const { fetchCryptoData, storeCryptoData } = require('./cryptoHelper');  // Adjust the path if necessary

// Schedule the job to run every minute
const startCronJob = () => {
  cron.schedule('* * * * *', async () => {
    console.log('Fetching crypto data...');

    // Loop through each coin and fetch and store its data
    for (const coin of ['bitcoin', 'matic-network', 'ethereum']) {
      const data = await fetchCryptoData(coin);
      await storeCryptoData(data);
    }

    console.log('Data fetching and storing completed!');
  });
};

module.exports = startCronJob;  // Ensure correct export
