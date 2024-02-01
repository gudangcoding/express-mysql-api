// models/ProductModel.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    // definisi kolom
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_produk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
    },
    satuan: {
      type: DataTypes.STRING,
    },
    harga: {
      type: DataTypes.DECIMAL(10, 2),
    },
    kategori_id: {
      type: DataTypes.INTEGER,
    },
  });

  // definisi relasi atau metode lain jika diperlukan

  return Product;
};
