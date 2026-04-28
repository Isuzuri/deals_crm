const express = require("express");
const comments = express.Router();
const getComment = require("../middleware/getComment");
const commentsController = require("../controllers/comments.controller");

comments.param("comment_id", getComment);

comments.post("/", commentsController.create);
comments.get("/", commentsController.getAll);
comments.get("/:comment_id", commentsController.getOne);
comments.put("/:comment_id", commentsController.update);
comments.delete("/:comment_id", commentsController.deleteOne);

module.exports = comments;
