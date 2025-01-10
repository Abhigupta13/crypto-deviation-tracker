const express = require('express');
const dotenv = require('dotenv'); 
const connectDB = require('./src/config/db'); 
const cryptoRoutes = require('./src/routes/cryptoRoutes');
const errorHandler = require('./src/middleware/errorHandler'); 
const startCronJob = require('./src/utils/cronJob'); 

dotenv.config(); 

const app = express();

connectDB();

startCronJob();

app.use(express.json());

// Routes
app.use('/api', cryptoRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
