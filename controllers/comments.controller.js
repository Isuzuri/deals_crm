const createError = require("../helpers/createError");
const commentsService = require("../services/comments.service");

const create = async (req, res, next) => {
  try {
    const { text } = req.body;
    const { id: deal_id } = req.deal;
    const { userId: author_id } = req.user;

    if (!text) throw createError(400, "Bad request");

    const result = await commentsService.create(text, deal_id, author_id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { search, page, pageSize, sortBy, order } = req.query;
    const result = await commentsService.getAll(search, page, pageSize, sortBy, order);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const result = req.comment;
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) throw createError(400, "Bad request");

    const { id: comment_id } = req.comment;
    if (!comment_id) throw createError(404, "Comment not found");

    const result = await commentsService.update(comment_id, text);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id: comment_id } = req.comment;
    if (!comment_id) throw createError(404, "Comment not found");

    await commentsService.deleteOne(comment_id);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, getOne, update, deleteOne };
