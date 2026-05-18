import * as commentsRepository from "../repositories/comments.repository.js";

export const create = async (text, deal_id, author_id) => {
  return await commentsRepository.create(text, deal_id, author_id);
};

export const getAll = async (search, page = 1, pageSize = 10, sortBy = "createdAt", order = "DESC") => {
  const comments = await commentsRepository.getAll(search, page, pageSize, sortBy, order);
  return {
    page,
    pageSize,
    count: comments.count,
    items: comments.rows,
  };
};

export const update = async (comment_id, text) => {
  return await commentsRepository.update(comment_id, text);
};

export const deleteOne = async (comment_id) => {
  return await commentsRepository.deleteOne(comment_id);
};
