import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

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

export default Comment;
