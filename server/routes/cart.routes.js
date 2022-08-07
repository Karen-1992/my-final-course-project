const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middleware/auth.middleware");
const Product = require("../models/Product");
const router = express.Router({ mergeParams: true });

// all
router.get("/:userId", auth, async (req, res) => {
    try {
        const list = await Cart.find();
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// add
router.post("/:userId", auth, async (req, res) => {
    try {
        const newCartItem = await Cart.create(req.body);
        res.status(201).send(newCartItem);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// update cart
router.patch("/:userId", auth, async (req, res) => {
    try {
        const { userId, productId } = req.params;
        // const userCart = await Product.findById(userId);
        // const productIndex = userCart.findIndex(p => p._id === productId);
        // userCart[productIndex] = req.body;
        const updatedCartProduct = await Product.findByIdAndUpdate(userId, req.body, {new: true});
        res.send(updatedCartProduct);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        });
    }
});

// delete one
router.delete("/:userId/:productId", auth, async (req, res) => {
    try {
        const { productId } = req.params;
        const removedCart = await Cart.findById(productId);
        await removedCart.remove();
        res.send(null);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        });
    }
});

// delete all
router.delete("/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;
        const removedCart = await Cart.findById(userId);
        await removedCart.remove();
        res.send(null);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        });
    }
});

module.exports = router;