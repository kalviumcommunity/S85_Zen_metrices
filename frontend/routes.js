const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create a new product
router.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a product
router.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a product
router.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: "Product deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
