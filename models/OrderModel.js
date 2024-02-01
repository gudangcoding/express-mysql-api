// models/OrderModel.js
const { DataTypes } = require('sequelize');
const db = require('../db');

const Order = (db) => {
  const model = db.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  return model;
};

module.exports = Order;
