import express from "express";
import * as clientsController from "../controllers/clients.controller.js";

const clients = express.Router();

clients.post("/", clientsController.create);
clients.get("/", clientsController.getAll);
clients.get("/:id", clientsController.getOne);
clients.put("/:id", clientsController.update);
clients.delete("/:id", clientsController.deleteOne);

export default clients;
