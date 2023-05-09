const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();
require("dotenv").config();
app.use(cors());
const PORT = process.env.PORT || 3000;
// token guardado en .env, si no funciona, sustituir TOKEN por el TOKEN que se encuentra en el README.md
const TOKEN = process.env.TOKEN;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/products', async (req, res) => {
  try {
    const response = await axios.get('https://test-fullstack.myshopify.com/admin/api/2023-04/products.json', {
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`https://test-fullstack.myshopify.com/admin/api/2023-04/products/${id}.json`, {
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data.product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
