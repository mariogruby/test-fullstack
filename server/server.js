const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();

require('dotenv').config();
app.use(cors());

const PORT = process.env.PORT || 5005;
const TOKEN = process.env.TOKEN;

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.get('/products', async (req, res) => {
    try {
        const response = axios.await.get(' https://test-fullstack.myshopify.com/admin/api/2023-04/products.json', {
        headers: { 'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json'
    }
})

res.json(response.data.products);
} catch (error) {
  console.log(error);
  res.status(500).json({ message: 'Internal server error' });
}
});

app.get('products/:id', async (req, res) => {
    try {
        const response = axios.await.get(`https://test-fullstack.myshopify.com/admin/api/2023-04/products/${id}.json`,{
            headers:{ 'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json'
    }
        })
        res.json(response.data.product);
    }catch (error){
        console.log(error)
        res.status(500).json({message:'Internal server error'});
    }
});

app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));