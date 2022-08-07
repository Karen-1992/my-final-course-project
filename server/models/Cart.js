const { Schema, model } = require("mongoose");

const  schema = new Schema({
    userId: [
        {
            productId:{
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
        }
    ]
}, {
    timestamps: true
});

module.exports = model("Cart", schema);
