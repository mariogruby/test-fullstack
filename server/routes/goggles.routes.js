const express = require('express');
const path = require('path');
const User = require('../models/User.model');
const Json = require('../jsons/goggles.json');

const { isAuthenticated } = require('../middleware/jwt.middleware');
const router = express.Router();

router.use(express.json());
router.use(express.static(path.join(__dirname, 'public')));

router.get('/products/goggles', async (req, res,) => {
    try {
        res.json(Json.products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/products/goggles/:productId', async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        const product = Json.products.find(p => p.id === productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/cart/add/:productId', isAuthenticated, async (req, res) => {
    const userId = req.payload._id;
    const productId = req.params.productId
    const productTitle = req.body.title;
    const productPrice = req.body.price;
    const productImage = req.body.image;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingProductIndex = user.cart.findIndex(item => item.productId === productId);

        if (existingProductIndex !== -1) {
            user.cart[existingProductIndex].quantity += 1;
        } else {
            user.cart.push({ productId: productId, title: productTitle, price: productPrice, image: productImage});
        }

        await user.save();
        return res.status(200).json({ message: "Product added to cart successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router; 