// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { Order, OrderDetail, Product } = require('../models');
const { authenticateToken } = require('../middleware');

// Create a new order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { customer_name, order_date, order_details } = req.body;

    const newOrder = await Order.create({ customer_name, order_date });

    // Create order details
    if (order_details && order_details.length > 0) {
      for (const orderDetail of order_details) {
        const { product_id, quantity } = orderDetail;

        const product = await Product.findByPk(product_id);

        if (!product) {
          return res.status(404).json({ message: `Product with ID ${product_id} not found` });
        }

        await OrderDetail.create({
          order_id: newOrder.id,
          product_id,
          quantity,
          unit_price: product.harga,
        });
      }
    }

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: OrderDetail, include: [Product] }],
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific order by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId, {
      include: [{ model: OrderDetail, include: [Product] }],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an order by ID
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const orderId = req.params.id;
    const { customer_name, order_date, order_details } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update order details
    if (order_details && order_details.length > 0) {
      await OrderDetail.destroy({ where: { order_id: orderId } });

      for (const orderDetail of order_details) {
        const { product_id, quantity } = orderDetail;

        const product = await Product.findByPk(product_id);

        if (!product) {
          return res.status(404).json({ message: `Product with ID ${product_id} not found` });
        }

        await OrderDetail.create({
          order_id: orderId,
          product_id,
          quantity,
          unit_price: product.harga,
        });
      }
    }

    // Update order information
    await order.update({ customer_name, order_date });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an order by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Delete associated order details
    await OrderDetail.destroy({ where: { order_id: orderId } });

    await order.destroy();

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rute untuk membuat pesanan baru
router.post('/create', authenticateToken, async (req, res) => {
    try {
      const { orderDetails } = req.body;
      const userId = req.user.userId;
  
      // Buat pesanan baru
      const order = await Order.create({ userId });
  
      // Tambahkan detail pesanan
      for (const detail of orderDetails) {
        await OrderDetail.create({
          orderId: order.id,
          productId: detail.productId,
          quantity: detail.quantity,
        });
      }
  
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Rute untuk mendapatkan pesanan berdasarkan pengguna
  router.get('/user', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
  
      // Ambil pesanan berdasarkan pengguna
      const orders = await Order.findAll({
        where: { userId },
        include: [{ model: OrderDetail, include: [Product] }],
      });
  
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Rute untuk checkout pesanan
  router.post('/checkout', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
  
      // Ambil pesanan yang belum di-checkout oleh pengguna
      const orders = await Order.findAll({
        where: { userId, checkedOut: false },
        include: [{ model: OrderDetail, include: [Product] }],
      });
  
      // Proses checkout untuk setiap pesanan
      for (const order of orders) {
        // Lakukan operasi checkout sesuai kebutuhan (contoh: mengupdate status pesanan)
        order.checkedOut = true;
        await order.save();
      }
  
      res.json({ message: 'Checkout successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
