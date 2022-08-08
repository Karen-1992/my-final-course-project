const express = require("express");
const Favorite = require("../models/Favorite");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

// all for one user
router.get("/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;
        const list = await Favorite.findOne({ userId });
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// toggle
router.post("/:userId", auth, async (req, res) => {
    try {
        const { productId, userId } = req.body;
        const userFavorites = await Favorite.findOne({ userId });
        if (userFavorites) {
            const { products } = userFavorites;
            const item = products.find(p => p.productId.toString() === productId);
            if (item) {
                await item.remove();
            } else {
                products.push(req.body);
            }
            await userFavorites.save();
            res.status(200).send(userFavorites);
        } else {
            const newFavorite = await Favorite.create({
                userId,
                products: [req.body]
            });
            await newFavorite.save();
            res.status(200).send(newFavorite);
        }

    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// delete all
router.delete("/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;
        const removedFavorites = await Favorite.findOne({ userId });
        await removedFavorites.remove();
        res.send(null);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        });
    }
});

module.exports = router;