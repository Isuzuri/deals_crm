const express = require("express");
const users = express.Router();
const usersController = require("../controllers/users.controller");

users.post("/", usersController.create);
users.get("/", usersController.getAll);
users.get("/:id/deals", usersController.getDealsByUser);
users.get("/:id", usersController.getOne);
users.put("/:id", usersController.update);
users.delete("/:id", usersController.deleteOne);

module.exports = users;
