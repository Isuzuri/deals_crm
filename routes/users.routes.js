import express from "express";
import * as usersController from "../controllers/users.controller.js";

const users = express.Router();

users.post("/", usersController.create);
users.get("/", usersController.getAll);
users.get("/:id/deals", usersController.getDealsByUser);
users.get("/:id", usersController.getOne);
users.put("/:id", usersController.update);
users.delete("/:id", usersController.deleteOne);

export default users;
