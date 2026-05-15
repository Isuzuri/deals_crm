import bcrypt from "bcrypt";
import * as usersRepository from "../repositories/users.repository.js";

const saltRounds = 10;

export const create = async (email, password, username, role = "manager") => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return usersRepository.create(email, hashedPassword, username, role);
};

export const getAll = async (search, page = 1, pageSize = 10, sortBy = "createdAt", order = "DESC") => {
  const users = await usersRepository.getAll(search, page, pageSize, sortBy, order);
  return {
    page,
    pageSize,
    count: users.count,
    items: users.rows,
  };
};

export const getOne = async (id) => {
  return usersRepository.getOne(id);
};

export const update = async (id, email, username, role, password) => {
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, saltRounds);
  }

  return usersRepository.update(id, email, username, role, hashedPassword);
};

export const deleteOne = async (id) => {
  return usersRepository.deleteOne(id);
};

export const getDealsByUser = async (id, page = 1, pageSize = 10, sortBy = "createdAt", order = "DESC") => {
  const deals = await usersRepository.getDealsByUser(id, page, pageSize, sortBy, order);
  return {
    page,
    pageSize,
    count: deals.count,
    items: deals.rows,
  };
};
