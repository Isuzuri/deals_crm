const express = require("express");
const deals = express.Router();
const getDeal = require("../middleware/getDeal");
const dealsController = require("../controllers/deals.controller");
const comments = require("./comments.router");

deals.use('/:deal_id/comments', comments)

deals.param("deal_id", getDeal);

deals.post("/", dealsController.create);
deals.get("/", dealsController.getAll);
deals.get("/:deal_id", dealsController.getOne);
deals.put("/:deal_id", dealsController.update);
deals.delete("/:deal_id", dealsController.deleteOne);

module.exports = deals;
