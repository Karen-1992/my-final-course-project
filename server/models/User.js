const { Schema, model } = require("mongoose");

const  schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    cash: Number,
    sex: {
        type: String,
        enum: ["male", "female", "other"]
    },
    role: {
        type: String,
        enum: ["user", "admin"]
    },
    phone: String
}, {
    timestamps: true
});

module.exports = model("User", schema);