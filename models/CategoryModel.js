// models/CategoryModel.js
const { DataTypes } = require('sequelize');
const db = require('../db');

const Category = (db) => {
  const model = db.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return model;
};

module.exports = Category;
