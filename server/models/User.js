const { Schema, model } = require("mongoose");

const  schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // address: {
    //     locality: String,
    //     street: String,
    //     homeNumber: String,
    //     flatNumber: String
    // },
    cash: Number,
    sex: {
        type: String,
        enum: ["male", "female", "other"]
    },
    role: {
        type: String,
        default: "user"
    },
    phone: String
}, {
    timestamps: true
});

module.exports = model("User", schema);