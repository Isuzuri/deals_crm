const { Op } = require("sequelize");
const db = require("../models");
const { User, Deal, Client } = db;

const safeUserAttributes = { exclude: ["password"] };

const create = async (email, password, username, role) => {
  return User.create({ email, password, username, role });
};

const getAll = async (search, page, pageSize, sortBy, order) => {
  return User.findAndCountAll({
    where: search
      ? {
          [Op.or]: [{ email: { [Op.like]: `%${search}%` } }, { username: { [Op.like]: `%${search}%` } }],
        }
      : {},
    attributes: safeUserAttributes,
    order: [[sortBy, order]],
    limit: Number(pageSize),
    offset: (Number(page) - 1) * Number(pageSize),
  });
};

const getOne = async (id) => {
  return User.findByPk(id, { attributes: safeUserAttributes });
};

const update = async (id, email, username, role, password) => {
  const payload = { email, username, role };
  if (password) payload.password = password;
  return User.update(payload, { where: { id } });
};

const deleteOne = async (id) => {
  return User.destroy({ where: { id } });
};

const getDealsByUser = async (id, page, pageSize, sortBy, order) => {
  return Deal.findAndCountAll({
    include: [
      {
        model: Client,
        where: { manager_id: id },
        attributes: ["id", "name", "email", "phone", "company", "status", "manager_id"],
      },
    ],
    order: [[sortBy, order]],
    limit: Number(pageSize),
    offset: (Number(page) - 1) * Number(pageSize),
  });
};

module.exports = { create, getAll, getOne, update, deleteOne, getDealsByUser };
