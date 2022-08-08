const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middleware/auth.middleware");
const Product = require("../models/Product");
const router = express.Router({ mergeParams: true });

//////////////////////
// toggle
// router.post("/:userId", auth, async (req, res) => {
//     try {
//         const { productId, userId } = req.body;
//         const userFavorites = await Favorite.findOne({ userId });
//         if (userFavorites) {
//             const { products } = userFavorites;
//             const item = products.find(p => p.productId.toString() === productId);
//             if (item) {
//                 await item.remove();
//             } else {
//                 products.push(req.body);
//             }
//             await userFavorites.save();
//             res.status(200).send(userFavorites);
//         } else {
//             const newFavorite = await Favorite.create({
//                 userId,
//                 products: [req.body]
//             });
//             await newFavorite.save();
//             res.status(200).send(newFavorite);
//         }
//
//     } catch (e) {
//         res.status(500).json({
//             message: "На сервере произошла ошибка. Попробуйте позже"
//         });
//     }
// });
////////////////////////


//////////////////////////
// get user cart
router.get("/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;
        const list = await Cart.findOne({ userId });
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});


//         const userFavorites = await Favorite.findOne({ userId });
//         if (userFavorites) {
//             const { products } = userFavorites;
//             const item = products.find(p => p.productId.toString() === productId);
//             if (item) {
//                 await item.remove();
//             } else {
//                 products.push(req.body);
//             }
//             await userFavorites.save();
//             res.status(200).send(userFavorites);
//         } else {
//             const newFavorite = await Favorite.create({
//                 userId,
//                 products: [req.body]
//             });
//             await newFavorite.save();
//             res.status(200).send(newFavorite);
//         }
// add
router.patch("/:userId", auth, async (req, res) => {
    try {
        const { productId, userId } = req.body;
        const userCart = await Cart.findOne({ userId });
        if (userCart) {
            const { products } = userCart;
            const item = products.find(p => p.productId.toString() === productId);
            if (item) {
                await item.remove();
            } else {
                products.push(req.body);
            }
            await userCart.save();
            res.status(200).send(userCart);
        } else {
            const newCart = await Cart.create({
                userId,
                products: [req.body]
            });
            await newCart.save();
            res.status(200).send(newCart);
        }

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


// delete one item
router.delete("/:userId", auth, async (req, res) => {
    try {
        const { productId } = req.params;
        const userCart = await Cart.findOne({ userId });
        const { products } = userCart;
        const item = products.find(p => p.productId.toString() === productId);
        await item.remove();
        await userCart.save();
        res.status(200).send(userCart);
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
        const removedCart = await Cart.findOne({ userId });
        await removedCart.remove();
        res.send(null);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        });
    }
});

module.exports = router;