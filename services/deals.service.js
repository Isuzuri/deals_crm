const dealsRepository = require("../repositories/deals.repository");

const create = async (title, amount, client_id) => {
  const status = "new";
  const deadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return await dealsRepository.create(title, amount, status, deadline, client_id);
};

const getAll = async (search, page = 1, pageSize = 10, sortBy = "createdAt", order = "DESC") => {
  const deals = await dealsRepository.getAll(search, page, pageSize, sortBy, order);
  return {
    page,
    pageSize,
    count: deals.count,
    items: deals.rows,
  };
};

// const getOne = async (id) => {
//   return await dealsRepository.getOne(id);
// };

const update = async (deal_id, title, amount, status, deadline, client_id) => {
  return await dealsRepository.update(deal_id, title, amount, status, deadline, client_id);
};

const deleteOne = async (id) => {
  return await dealsRepository.deleteOne(id);
};

module.exports = { create, getAll, update, deleteOne };
