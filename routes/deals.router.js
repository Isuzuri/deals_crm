const express = require("express");
const deals = express.Router();
const getDeal = require('../middleware/getDeal')
const dealsController = require('../controllers/deals.controller')

deals.param('id', getDeal)

deals.post('/', dealsController.create);
deals.get('/', dealsController.getAll)
deals.get('/:id', dealsController.getOne)
deals.put('/:id', dealsController.update)
deals.delete('/:id', dealsController.deleteOne)

module.exports = deals;