// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { Product } = require('../models/ProductModel'); // Sesuaikan dengan path dan nama file model Anda
const { authenticateToken } = require('../middleware');

// Create a new product
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { nama_produk, deskripsi, satuan, harga, kategori_id } = req.body;

    const newProduct = await Product.create({ nama_produk, deskripsi, satuan, harga, kategori_id });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products
router.get('/', authenticateToken, async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific product by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product by ID
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const productId = req.params.id;
    const { nama_produk, deskripsi, satuan, harga, kategori_id } = req.body;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = await product.update({ nama_produk, deskripsi, satuan, harga, kategori_id });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
