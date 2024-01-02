const express = require('express');
const axios = require('axios');
const path = require('path');
// const cors = require('cors'); // Importa el middleware cors
// const app = express();
const router = express.Router();

require('dotenv').config();
// app.use(cors());

const TOKEN = process.env.TOKEN;

router.use(express.json());
router.use(express.static(path.join(__dirname, 'public')));

router.get('/products', async (req, res) => {
    try {
        const response = await axios.get(' https://test-fullstack.myshopify.com/admin/api/2023-04/products.json', {
            headers:
            {
                'X-Shopify-Access-Token': TOKEN,
                'Content-Type': 'application/json'
            }
        })

        res.json(response.data.products);
        // console.log(response.data.products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`https://test-fullstack.myshopify.com/admin/api/2023-04/products/${id}.json`, {
            headers:
            {
                'X-Shopify-Access-Token': TOKEN,
                'Content-Type': 'application/json'
            }
        })
        res.json(response.data.product);
        // console.log(response.data.product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;