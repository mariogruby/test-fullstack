const express = require('express');
const axios = require('axios');
const path = require('path');
const User = require('../models/User.model')


const { isAuthenticated } = require('../middleware/jwt.middleware');
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

router.post('/cart/add/:product_id', isAuthenticated, async (req, res) => {
    const userId = req.payload._id;
    const productId = req.params.product_id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Verificar si el producto ya está en el carrito del usuario
        const existingProductIndex = user.cart.findIndex(item => item.productId === productId);

        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            user.cart[existingProductIndex].quantity += 1;
        } else {
            // Si no está en el carrito, agregarlo
            user.cart.push({ productId: productId });
        }

        await user.save();

        res.status(200).json({ message: "Product added to cart successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;

