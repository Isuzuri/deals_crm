const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Client = sequelize.define(
  "Client",
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true, notEmpty: true },
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        notEmpty: true,
      },
    },
    company: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.ENUM("lead", "active", "inactive"),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true },
);

module.exports = Client