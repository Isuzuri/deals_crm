const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const Comment = sequelize.define(
  "Comment",
  {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    deal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true },
);

module.exports = Comment