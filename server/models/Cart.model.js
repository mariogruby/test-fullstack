const { Schema, model } = require("mongoose");

const cartItemSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,  
            ref: "Product",  
        },
        quantity: {
            type: Number,
            default: 1, 
        },

    },
    {
        timestamps: true,
    }
);

const CartItem = model("CartItem", cartItemSchema);

module.exports = CartItem;