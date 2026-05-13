const dealsRepository = require("../repositories/deals.repository");
const redis = require("../config/redisClient");
const { toResponseList, toResponse } = require("../mappers/dealsMapper");

const create = async (title, amount, client_id) => {
  const status = "new";
  const deadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return await dealsRepository.create(title, amount, status, deadline, client_id);
};

const getAll = async (search, page = 1, pageSize = 10, sortBy = "createdAt", order = "DESC", manager_id, role) => {
  const cacheKey = `deals:${search || ""}:${page}:${pageSize}:${sortBy}:${order}:${manager_id}:${role}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const deals = await dealsRepository.getAll(search, page, pageSize, sortBy, order, manager_id, role);
  const response = toResponseList({ deals, page, pageSize });
  await redis.set(cacheKey, JSON.stringify(response), { EX: 60 });
  return response;
};

const getOne = async (deal) => {
  return toResponse(deal);
};

const update = async (deal_id, title, amount, status, deadline, client_id) => {
  const result = await dealsRepository.update(deal_id, title, amount, status, deadline, client_id);

  const cacheKeys = await redis.keys("deals:*");
  if (cacheKeys.length > 0) {
    await redis.del(cacheKeys);
  }

  return result;
};

const deleteOne = async (deal_id) => {
  return await dealsRepository.deleteOne(deal_id);
};

module.exports = { create, getAll, getOne, update, deleteOne };
