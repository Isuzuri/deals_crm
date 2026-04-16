const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Deal = sequelize.define(
  "Deal",
  {
    title: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        notEmpty: true,
      },
    },
    amount: {
      type: DataTypes.DECIMAL(2),
      allowNull: false,
      validate: {
        isDecimal: true,
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.ENUM("new", "in_progress", "won", "lost"),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    deadline: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        isDate: true,
        notEmpty: true,
      },
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true },
);

module.exports = Deal