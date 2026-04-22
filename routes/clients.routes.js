const express = require("express");
const clients = express.Router();
const clientsController = require('../controllers/clients.controller')

clients.post('/', clientsController.create);
clients.get('/', clientsController.getAll)
clients.get('/:id', clientsController.getOne)
clients.put('/:id', clientsController.update)
clients.delete('/:id', clientsController.deleteOne)

module.exports = clients;
