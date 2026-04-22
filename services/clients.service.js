const clientsRepository = require("../repositories/clients.repository");

const create = async (name, email, phone, company, manager_id) => {
  const status = "lead";
  return await clientsRepository.create(name, email, phone, company, manager_id, status);
};

const getAll = async (search, page = 1, pageSize = 10, sortBy = "createdAt", order = "DESC") => {
    return await clientsRepository.getAll(search, page, pageSize, sortBy, order)
}

module.exports = { create, getAll };
