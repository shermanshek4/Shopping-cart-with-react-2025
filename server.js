// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST /checkout
app.post('/checkout', (req, res) => {
  const { cart, customer, total } = req.body;

  if (!cart || !customer || typeof total !== 'number') {
    return res.status(400).json({ error: 'Missing or invalid data' });
  }

  console.log('New Order Received:');
  console.log('Customer:', customer);
  console.log('Cart:', cart);
  console.log('Total:', total);

  // TODO: Save to DB (MongoDB, etc.)

  return res.status(200).json({ message: 'Order received successfully' });
});

// Test route
app.get('/', (req, res) => res.send('Checkout API Live'));

app.listen(PORT, () => {
  console.log('Server running at http://localhost:${PORT}');
});