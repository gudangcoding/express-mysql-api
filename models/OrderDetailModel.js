const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // tambahkan kolom lain jika diperlukan
  });

  // Definisikan relasi atau metode lain jika diperlukan

  return OrderDetail;
};
