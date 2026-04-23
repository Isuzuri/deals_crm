const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Deal = sequelize.define(
  "Deal",
  {
    title: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
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
      type: DataTypes.DATE,
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