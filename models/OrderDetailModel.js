// models/OrderDetailModel.js
const { DataTypes } = require('sequelize');
const db = require('../db');

const OrderDetail = (db) => {
  const model = db.define('OrderDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  return model;
};

module.exports = OrderDetail;
