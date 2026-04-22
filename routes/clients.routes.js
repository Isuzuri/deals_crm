const express = require("express");
const clients = express.Router();
const clientsController = require('../controllers/clients.controller')

clients.post('/', clientsController.create);
// clients.get()
// clients.get()
// clients.put()
// clients.delete()

module.exports = clients;
