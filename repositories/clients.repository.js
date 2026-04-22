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

const getOne = async (id) => {
  return await Client.findByPk(id);
};

const update = async (id, name, email, phone, company, status) => {
  return await Client.update({ name, email, phone, company, status }, { where: id });
};

const deleteOne = async (id) => {
    return await Client.destroy({where: id})
}

module.exports = { create, getAll, getOne, update, deleteOne };
