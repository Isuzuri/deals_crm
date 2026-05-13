const { Op } = require("sequelize");
const db = require("../models");
const { Deal, Client } = db;

const create = async (title, amount, status, deadline, client_id) => {
  return Deal.create({ title, amount, status, deadline, client_id });
};

const getAll = async (search, page, pageSize, sortBy, order, manager_id, role) => {
  const dealWhere = search
    ? { [Op.or]: [{ title: { [Op.like]: `%${search}%` } }, { amount: { [Op.like]: `%${search}%` } }] }
    : {};

  const dealInclude =
    role !== "admin" ? [{ model: Client, attributes: [], where: { manager_id }, required: true }] : [];

  const query = {
    where: dealWhere,
    order: [[sortBy, order]],
    limit: Number(pageSize),
    offset: (Number(page) - 1) * Number(pageSize),
    include: dealInclude,
  };

  const deals = await Deal.findAndCountAll(query);

  return deals;
};

// const getOne = async (id) => {
//   return await Deal.findByPk(id);
// };

const update = async (deal_id, title, amount, status, deadline, client_id) => {
  return await Deal.update({ title, amount, status, deadline, client_id }, { where: { id: deal_id } });
};

const deleteOne = async (deal_id) => {
  return await Deal.destroy({ where: { id: deal_id } });
};

module.exports = { create, getAll, update, deleteOne };
