import express from "express";
import getDeal from "../middleware/getDeal.js";
import * as dealsController from "../controllers/deals.controller.js";
import comments from "./comments.router.js";

const deals = express.Router();

deals.use("/:deal_id/comments", comments);

deals.param("deal_id", getDeal);

deals.post("/", dealsController.create);
deals.get("/", dealsController.getAll);
deals.get("/:deal_id", dealsController.getOne);
deals.put("/:deal_id", dealsController.update);
deals.delete("/:deal_id", dealsController.deleteOne);

export default deals;
