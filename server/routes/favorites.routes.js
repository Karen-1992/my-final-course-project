const express = require("express");
const Favorite = require("../models/Favorite");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

// all
router.get("/:userId", auth, async (req, res) => {
    try {
        const list = await Favorite.find();
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
        const newFavorite = await Favorite.create(req.body);
        res.status(201).send(newFavorite);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// delete one
router.delete("/:userId/:productId", auth, async (req, res) => {
    try {
        const { productId } = req.params;
        const removedFavorite = await Favorite.findById(productId);
        await removedFavorite.remove();
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
        const removedFavorites = await Favorite.findById(userId);
        await removedFavorites.remove();
        res.send(null);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        });
    }
});

module.exports = router;