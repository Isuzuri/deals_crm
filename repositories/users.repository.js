import { Op } from "sequelize";
import db from "../models/index.js";

const { User, Deal, Client } = db;

const safeUserAttributes = { exclude: ["password"] };

export const create = async (email, password, username, role) => {
  return User.create({ email, password, username, role });
};

export const getAll = async (search, page, pageSize, sortBy, order) => {
  const userWhere = search
    ? { [Op.or]: [{ email: { [Op.like]: `%${search}%` } }, { username: { [Op.like]: `%${search}%` } }] }
    : {};

  return User.findAndCountAll({
    where: userWhere,
    attributes: safeUserAttributes,
    order: [[sortBy, order]],
    limit: Number(pageSize),
    offset: (Number(page) - 1) * Number(pageSize),
  });
};

export const getOne = async (id) => {
  return User.findByPk(id, { attributes: safeUserAttributes });
};

export const update = async (id, email, username, role, password) => {
  const payload = { email, username, role };
  if (password) payload.password = password;
  return User.update(payload, { where: { id } });
};

export const deleteOne = async (id) => {
  return User.destroy({ where: { id } });
};

export const getDealsByUser = async (id, page, pageSize, sortBy, order) => {
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
