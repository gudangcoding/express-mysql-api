// models/User.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const User = (db) => {
  const model = db.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Hash password before saving to the database
  model.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  return model;
};

module.exports = User;
