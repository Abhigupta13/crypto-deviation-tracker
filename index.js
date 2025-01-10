const express = require('express');
const dotenv = require('dotenv'); // Ensure dotenv is loaded to use environment variables
const connectDB = require('./src/config/db'); // Adjust if path is incorrect
const cryptoRoutes = require('./src/routes/cryptoRoutes'); // Adjust if path is incorrect
const errorHandler = require('./src/middleware/errorHandler'); // Adjust if path is incorrect
const startCronJob = require('./src/utils/cronJob'); // Corrected path for cron job

dotenv.config(); // Load environment variables

const app = express();

// Connect to the database
connectDB();

// Start the background cron job
startCronJob();

// Middleware
app.use(express.json());

// Routes
app.use('/api', cryptoRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
