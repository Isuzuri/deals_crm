const bcrypt = require("bcrypt");
const usersRepository = require("../repositories/users.repository");

const saltRounds = 10;

const create = async (email, password, username, role = "manager") => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return usersRepository.create(email, hashedPassword, username, role);
};

const getAll = async (search, page = 1, pageSize = 10, sortBy = "createdAt", order = "DESC") => {
  const users = await usersRepository.getAll(search, page, pageSize, sortBy, order);
  return {
    page,
    pageSize,
    count: users.count,
    items: users.rows,
  };
};

const getOne = async (id) => {
  return usersRepository.getOne(id);
};

const update = async (id, email, username, role, password) => {
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, saltRounds);
  }

  return usersRepository.update(id, email, username, role, hashedPassword);
};

const deleteOne = async (id) => {
  return usersRepository.deleteOne(id);
};

const getDealsByUser = async (id, page = 1, pageSize = 10, sortBy = "createdAt", order = "DESC") => {
  const deals = await usersRepository.getDealsByUser(id, page, pageSize, sortBy, order);
  return {
    page,
    pageSize,
    count: deals.count,
    items: deals.rows,
  };
};

module.exports = { create, getAll, getOne, update, deleteOne, getDealsByUser };
