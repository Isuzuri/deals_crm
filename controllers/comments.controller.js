import createError from "../helpers/createError.js";
import * as commentsService from "../services/comments.service.js";

export const create = async (req, res, next) => {
  try {
    const { text } = req.body;
    const { id: deal_id } = req.deal;
    const { id: author_id } = req.user;

    if (!text) throw createError(400, "Bad request");

    const result = await commentsService.create(text, deal_id, author_id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { search, page, pageSize, sortBy, order } = req.query;
    const result = await commentsService.getAll(search, page, pageSize, sortBy, order);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const result = req.comment;
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
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

export const deleteOne = async (req, res, next) => {
  try {
    const { id: comment_id } = req.comment;
    if (!comment_id) throw createError(404, "Comment not found");

    await commentsService.deleteOne(comment_id);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};
