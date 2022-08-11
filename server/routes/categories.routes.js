const express = require("express");
const Category = require("../models/Category");
const router = express.Router({ mergeParams: true });
// const checkRole = require("../middleware/admin.middleware");

router.get("/", async (req, res) => {
    try {
        const list = await Category.find();
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// router.post("/", checkRole("admin"), async (req, res) => {
//     try {
//         const newCategory = await Category.create(req.body);
//         res.status(201).send(newCategory);
//     } catch (e) {
//         res.status(500).json({
//             message: 'На сервере произошла ошибка. Попробуйте позже'
//         });
//     }
// });

// router.patch("/:categoryId", checkRole("admin"), async (req, res) => {
//     try {
//         const { categoryId } = req.params;
//         const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, {new: true});
//         res.send(updatedCategory);
//     } catch (e) {
//         res.status(500).json({
//             message: "На сервере произошла ошибка. Попробуйте позже"
//         });
//     }
// });
//
// router.delete("/:categoryId", checkRole("admin"), async (req, res) => {
//     try {
//         const { categoryId } = req.params;
//         const removedCategory = await Cart.findById(categoryId);
//         await removedCategory.remove();
//         res.send(null);
//     } catch (e) {
//         res.status(500).json({
//             message: "На сервере произошла ошибка. Попробуйте позже"
//         });
//     }
// });

module.exports = router;