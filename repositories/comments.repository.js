const { Op } = require("sequelize");
const db = require("../models");
const { Comment } = db;

const create = async (text, deal_id, author_id) => {
  return Comment.create({ text, deal_id, author_id });
};

const getAll = async (search, page, pageSize, sortBy, order) => {
  const comments = await Comment.findAndCountAll({
    where: search ? { text: { [Op.like]: `%${search}%` } } : {},
    order: [[sortBy, order]],
    limit: Number(pageSize),
    offset: (Number(page) - 1) * Number(pageSize),
  });
  return comments;
};

// const getOne = async (id) => {
//   return await Deal.findByPk(id);
// };

const update = async (comment_id, text) => {
  return await Comment.update({ text }, { where: { id: comment_id } });
};

const deleteOne = async (comment_id) => {
  return await Comment.destroy({ where: { id: comment_id } });
};

module.exports = { create, getAll, update, deleteOne };
