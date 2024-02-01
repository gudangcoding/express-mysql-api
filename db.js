// db.js
const express = require('express');
const { Sequelize } = require('sequelize');
const ProductModel = require('./models/ProductModel');
const UserModel = require('./models/UserModel');
const CategoryModel = require('./models/CategoryModel');
const OrderModel = require('./models/OrderModel');
const OrderDetailModel = require('./models/OrderDetailModel');
const { authenticateToken } = require('./middleware');

const app = express();

const db = new Sequelize('express-api', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Product = ProductModel(db);
const User = UserModel(db);
const Category = CategoryModel(db);
const Order = OrderModel(db);
const OrderDetail = OrderDetailModel(db);





module.exports = { db, Product, User, Category, Order, OrderDetail, app };
