const express = require("express");
const Product = require("../models/Product");
const { generateProductData } = require("../utils/helpers");
const router = express.Router({ mergeParams: true });

// all products
router.get("/", async (req, res) => {
    try {
        const list = await Product.find();
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// one product by id
router.get("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        res.status(200).send(product);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// products by category name
router.get("/categories/:categoryId", async (req, res) => {
    try {
        const { categoryId } = req.params;
        const list = await Product.find();
        const filteredList = list.filter(i => i.category.toString() === categoryId);
        res.status(200).send(filteredList);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// add product
router.post("/", async (req, res) => {
    try {
        const newProduct = await Product.create({
            ...generateProductData(),
            ...req.body
        });
        res.status(201).send(newProduct);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
});

// update product
router.patch("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true});
        res.send(updatedProduct);
        console.log("edited")
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        });
    }
});

// delete product
router.delete("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const removedProduct = await Product.findById(productId);
        await removedProduct.remove();
        res.send(null);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        });
    }
});

module.exports = router;