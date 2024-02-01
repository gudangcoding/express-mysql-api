const express = require('express');
const router = express.Router();

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');

//routes

router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);


module.exports = router;
