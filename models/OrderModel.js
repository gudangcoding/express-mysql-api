const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checkedOut: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // tambahkan kolom lain jika diperlukan
  });

  // Definisikan relasi atau metode lain jika diperlukan

  return Order;
};
