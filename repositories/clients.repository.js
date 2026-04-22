const { Op } = require("sequelize");
const db = require("../models");
const { Client } = db;

const create = async (name, email, phone, company, manager_id, status) => {
  return Client.create({ name, email, phone, company, manager_id, status });
};

const getAll = async (search, page, pageSize, sortBy, order) => {
  const clients = await Client.findAndCountAll({
    where: search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { company: { [Op.like]: `%${search}%` } },
            { phone: { [Op.like]: `%${search}%` } },
          ],
        }
      : {},
    order: [[sortBy, order]],
    limit: Number(pageSize),
    offset: (Number(page) - 1) * Number(pageSize),
  });
  return clients;
};

module.exports = { create, getAll };
