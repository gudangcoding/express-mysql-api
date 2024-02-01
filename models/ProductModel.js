// models/Product.js
const { DataTypes } = require('sequelize');
const db = require('../db');

const Product = (db) => {
  const model = db.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nama_produk: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    satuan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    harga: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    kategori_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  return model;
};

module.exports = Product;
