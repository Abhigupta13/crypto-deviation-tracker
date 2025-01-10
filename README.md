# Crypto Tracker API

A simple API for tracking cryptocurrency prices (Bitcoin, Matic, Ethereum) using the CoinGecko API. This application fetches the latest crypto data every 2 hours and stores it in MongoDB. It provides endpoints to access the latest data and calculate price deviations.

## Tech Stack
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing crypto data
- **Axios**: For making HTTP requests to the CoinGecko API
- **Cron**: Scheduling jobs (fetching crypto data every 2 hours)
- **dotenv**: Environment variable management
- **Node-cron**: Cron job scheduling package
- **Mongoose**: MongoDB ORM for managing schema and data

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Abhigupta13/crypto-deviation-tracker.git
cd crypto-deviation-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:

```env
MONGO_URI=<Your MongoDB Connection URI>
PORT=5000
API_KEY=your_coingecko_api_key
```

Replace `<Your MongoDB Connection URI>` with your actual MongoDB URI. You can use MongoDB Atlas or your local MongoDB instance.

### Running the Application

1. Start the server:

```bash
npm start
```

The server will be running on `http://localhost:5000`.

2. The cron job will run every 2 hours, fetching and storing the latest crypto data in the MongoDB database.


### Cron Job Setup
The cron job is configured to run every 2 hours. It uses the following cron expression:

```javascript
cron.schedule('0 */2 * * *', async () => {
  console.log('Fetching crypto data...');
  // Fetch and store crypto data for Bitcoin, Matic, and Ethereum
});
```

This fetches the latest data for Bitcoin, Matic, and Ethereum from CoinGecko.

## API Endpoints

### `GET /api/stats`

Fetches the latest cryptocurrency data for a given coin. You can pass the `coin` parameter as a query string.

#### Query Parameters:
- `coin` (required): The coin for which to fetch the stats. Can be one of the following: `bitcoin`, `matic-network`, `ethereum`.

#### Example Request:
```bash
GET /api/stats?coin=bitcoin
```

#### Example Response:
```json
{
  "success": true,
  "data": {
    "coin": "bitcoin",
    "price": 46324.12,
    "marketCap": 874000000000,
    "change24h": 2.5,
    "timestamp": "2025-01-10T08:00:00.000Z"
  },
  "message": "Successfully fetched the data"
}
```

### `GET /api/deviation`

Fetches the price deviation for a given coin over the past 24 hours.

#### Query Parameters:
- `coin` (required): The coin for which the price deviation is calculated. Can be one of the following: `bitcoin`, `matic-network`, `ethereum`.

#### Example Request:
```bash
GET /api/deviation?coin=bitcoin
```

#### Example Response:
```json
{
  "success": true,
  "deviation": 3.2,
  "message": "Successfully fetched the price deviation"
}
```

## Error Handling
- If an invalid `coin` parameter is provided, a `400` error is returned with an appropriate message.
- If there’s an issue with fetching data from CoinGecko or MongoDB, a `500` error is returned.
  
