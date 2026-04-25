const { Op } = require("sequelize");
const db = require("../models");
const { Deal } = db;

const create = async (title, amount, status, deadline, client_id) => {
  return Deal.create({ title, amount, status, deadline, client_id });
};

const getAll = async (search, page, pageSize, sortBy, order) => {
  const deals = await Deal.findAndCountAll({
    where: search
      ? {
          [Op.or]: [{ title: { [Op.like]: `%${search}%` } }, { amount: { [Op.like]: `%${search}%` } }],
        }
      : {},
    order: [[sortBy, order]],
    limit: Number(pageSize),
    offset: (Number(page) - 1) * Number(pageSize),
  });
  return deals;
};

// const getOne = async (id) => {
//   return await Deal.findByPk(id);
// };

const update = async (deal_id, title, amount, status, deadline, client_id) => {
  return await Deal.update({ title, amount, status, deadline, client_id }, { where: { deal_id } });
};

const deleteOne = async (id) => {
  return await Deal.destroy({ where: { id } });
};

module.exports = { create, getAll, update, deleteOne };
