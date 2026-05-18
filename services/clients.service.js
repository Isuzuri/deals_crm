import * as clientsRepository from "../repositories/clients.repository.js";

export const create = async (name, email, phone, company, manager_id) => {
  const status = "lead";
  return await clientsRepository.create(name, email, phone, company, manager_id, status);
};

export const getAll = async (search, page = 1, pageSize = 10, sortBy = "createdAt", order = "DESC") => {
  const clients = await clientsRepository.getAll(search, page, pageSize, sortBy, order);
  return {
    page,
    pageSize,
    count: clients.count,
    items: clients.rows,
  };
};

export const getOne = async (id) => {
  return await clientsRepository.getOne(id);
};

export const update = async (id, name, email, phone, company, status) => {
  return await clientsRepository.update(id, name, email, phone, company, status);
};

export const deleteOne = async (id) => {
  return await clientsRepository.deleteOne(id);
};
