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

router.post('/cart/add/:id', isAuthenticated, async (req, res) => {
    const userId = req.payload._id;
    const productId = req.params.id;
    const productTitle = req.body.title;
    const productPrice = req.body.price;

    try {
        const response = await axios.get(`https://test-fullstack.myshopify.com/admin/api/2023-04/products/${productId}.json`, {
            headers: {
                'X-Shopify-Access-Token': TOKEN,
                'Content-Type': 'application/json'
            }
        });

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const existingProductIndex = user.cart.findIndex(item => item.productId === productId);

        if (existingProductIndex !== -1) {
            user.cart[existingProductIndex].quantity += 1;
        } else {
            user.cart.push({ productId: productId, title: productTitle, price: productPrice });
        }

        await user.save();

        // Solo enviar la respuesta después de realizar todas las operaciones
        return res.status(200).json({ message: "Product added to cart successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



router.get('/user/cart', isAuthenticated, async (req,  res) => {
    const userId = req.payload._id;

    try {

        const user = await User.findById(userId).select('cart');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } 
        res.status(200).json(user.cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error'})
    }
})


module.exports = router;

