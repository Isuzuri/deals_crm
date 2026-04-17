"use strict";

const User = require("./User");
const Client = require("./Client");
const Deal = require("./Deal");
const Comment = require("./Comment");
const { sequelize } = require("./db");
const Sequelize = require("sequelize");

const db = {};
db.User = User;
db.Client = Client;
db.Deal = Deal;
db.Comment = Comment;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Associations
// User
db.User.hasMany(db.Client, {
  foreignKey: "manager_id",
});
db.Client.belongsTo(db.User, {
  foreignKey: "manager_id",
});

db.User.hasMany(db.Comment, {
  foreignKey: "author_id",
});
db.Comment.belongsTo(db.User, {
  foreignKey: "author_id",
});

//Client
db.Client.hasMany(db.Deal, {
  foreignKey: "client_id",
});
db.Deal.belongsTo(db.Client, {
  foreignKey: "client_id",
});

//Deal
db.Deal.hasMany(db.Comment, {
  foreignKey: "deal_id",
});
db.Comment.belongsTo(db.Deal, {
  foreignKey: "deal_id",
});
module.exports = db;
