const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const Cart = require('../models/Cart.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.post("/add-to-cart/:id", isAuthenticated, async (req, res, next) => {
    const productId = req.params.id;
    const userId = req.payload._id;

    try {
        const cartItem = { product: productId, quantity: 1 }; // Crear el nuevo objeto de elemento de carrito

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [cartItem] });
        } else {
            cart.items.push(cartItem);
        }

        await cart.save();

        res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
