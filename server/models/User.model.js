const { Schema, model } = require("mongoose")

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required."],
        },
        name: {
            type: String,
            required: [true, "Name is required."],
        },
        cart: [
            {
                productId: {
                    type: String, // Cambia a String si el ID es una cadena
                    // type: Schema.Types.ObjectId, // Usar ObjectId si es un ObjectId
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                title: {
                    type: String,
                    // required: true,
                },
                price: {
                    type: Number,
                    //required: true,
                },
                image: {
                    type: String,
                },
            }
        ],
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

module.exports = User;