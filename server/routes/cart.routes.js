const express = require('express');
const auth = require('../middleware/auth.middleware');
const Cart = require('../models/Cart');
const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(auth, async (req, res) => {
        try {
            const { orderBy, equalTo } = req.query;
            const list = await Cart.find({ [orderBy]: equalTo });
            res.send(list);
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            });
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newCart = await Cart.create({
                ...req.body,
                userId: req.user._id
            });
            res.status(201).send(newCart);
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            });
        }
    });

router.delete("/:productId", auth, async (req, res) => {
    try {
        const { productId } = req.params;
        const removedProduct = await Cart.findById(productId);

        if (removedProduct.userId.toString() === req.user._id) {
            await removedProduct.remove();
            return res.send(null);
        } else {
            res.status(401).json({message: 'Unauthorized'});
        }
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        });
    }
})


module.exports = router;