import { Op } from "sequelize";
import db from "../models/index.js";

const { Client } = db;

export const create = async (name, email, phone, company, manager_id, status) => {
  return Client.create({ name, email, phone, company, manager_id, status });
};

export const getAll = async (search, page, pageSize, sortBy, order) => {
  const clientsWhere = search
    ? {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { company: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
        ],
      }
    : {};

  const clients = await Client.findAndCountAll({
    where: clientsWhere,
    order: [[sortBy, order]],
    limit: Number(pageSize),
    offset: (Number(page) - 1) * Number(pageSize),
  });

  return clients;
};

export const getOne = async (id) => {
  return await Client.findByPk(id);
};

export const update = async (id, name, email, phone, company, status) => {
  return await Client.update({ name, email, phone, company, status }, { where: { id } });
};

export const deleteOne = async (id) => {
  return await Client.destroy({ where: { id } });
};
