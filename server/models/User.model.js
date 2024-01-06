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
        cart: [{type: Schema.Types.ObjectId, ref: "CartItem"}]
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

module.exports = User;