const commentsRepository = require("../repositories/comments.repository");

const create = async (text, deal_id, author_id) => {
  return await commentsRepository.create(text, deal_id, author_id);
};

const getAll = async (search, page = 1, pageSize = 10, sortBy = "createdAt", order = "DESC") => {
  const comments = await commentsRepository.getAll(search, page, pageSize, sortBy, order);
  return {
    page,
    pageSize,
    count: comments.count,
    items: comments.rows,
  };
};

// const getOne = async (id) => {
//   return await commentsRepository.getOne(id);
// };

const update = async (comment_id, text) => {
  return await commentsRepository.update(comment_id, text);
};

const deleteOne = async (comment_id) => {
  return await commentsRepository.deleteOne(comment_id);
};

module.exports = { create, getAll, update, deleteOne };
