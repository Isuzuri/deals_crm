const express = require("express");
const clients = express.Router();
const clientsController = require('../controllers/clients.controller')

clients.post('/', clientsController.create);
clients.get('/')
clients.get('/:id')
clients.put('/:id')
clients.delete('/:id')

module.exports = clients;
