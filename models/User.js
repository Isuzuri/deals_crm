const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true, notEmpty: true },
    },
    password: {
      type: DataTypes.STRING(60),
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "manager"),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = User