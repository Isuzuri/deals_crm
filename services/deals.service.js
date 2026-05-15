import * as dealsRepository from "../repositories/deals.repository.js";
import redis from "../config/redisClient.js";
import { toResponseList, toResponse } from "../mappers/dealsMapper.js";

export const create = async (title, amount, client_id) => {
  const status = "new";
  const deadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return await dealsRepository.create(title, amount, status, deadline, client_id);
};

export const getAll = async (search, page = 1, pageSize = 10, sortBy = "createdAt", order = "DESC", manager_id, role) => {
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

export const getOne = async (deal) => {
  return toResponse(deal);
};

export const update = async (deal_id, title, amount, status, deadline, client_id) => {
  const result = await dealsRepository.update(deal_id, title, amount, status, deadline, client_id);

  const cacheKeys = await redis.keys("deals:*");
  if (cacheKeys.length > 0) {
    await redis.del(cacheKeys);
  }

  return result;
};

export const deleteOne = async (deal_id) => {
  return await dealsRepository.deleteOne(deal_id);
};
