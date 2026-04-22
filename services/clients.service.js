const clientsRepository = require("../repositories/clients.repository");

const create = async (name, email, phone, company, manager_id) => {
  const status = "lead";
  return await clientsRepository.create(name, email, phone, company, manager_id, status);
};

const getAll = async (search, page = 1, pageSize = 10, sortBy = "createdAt", order = "DESC") => {
  return await clientsRepository.getAll(search, page, pageSize, sortBy, order);
};

const getOne = async (id) => {
  return await clientsRepository.getOne(id);
};

const update = async (id, name, email, phone, company, status) => {
  return await clientsRepository.update(id, name, email, phone, company, manager_id, status);
};

const deleteOne = async (id) => {
    return await clientsRepository.deleteOne(id)
}

module.exports = { create, getAll, getOne, update, deleteOne };
