const { Schema, model } = require("mongoose");

const CartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const CartItem = model("CartItem", CartItemSchema);
module.exports = CartItem;