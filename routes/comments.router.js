import express from "express";
import getComment from "../middleware/getComment.js";
import * as commentsController from "../controllers/comments.controller.js";

const comments = express.Router();

comments.param("comment_id", getComment);

comments.post("/", commentsController.create);
comments.get("/", commentsController.getAll);
comments.get("/:comment_id", commentsController.getOne);
comments.put("/:comment_id", commentsController.update);
comments.delete("/:comment_id", commentsController.deleteOne);

export default comments;
