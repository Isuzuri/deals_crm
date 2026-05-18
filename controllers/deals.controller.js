import createError from "../helpers/createError.js";
import * as dealsService from "../services/deals.service.js";

export const create = async (req, res, next) => {
  try {
    const { title, amount, client_id } = req.body;
    if (!title || !amount || !client_id) throw createError(400, "Bad request");

    const result = await dealsService.create(title, amount, client_id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { search, page, pageSize, sortBy, order } = req.query;
    const { id: manager_id, role } = req.user;
    if (!manager_id || !role) throw createError(401, "Unauthorized");

    const result = await dealsService.getAll(search, page, pageSize, sortBy, order, manager_id, role);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const deal = req.deal;
    const result = await dealsService.getOne(deal);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { title, amount, status, deadline, client_id } = req.body;
    if (!title || !amount || !status || !deadline || !client_id) throw createError(400, "Bad request");

    const { id: deal_id } = req.deal;
    if (!deal_id) throw createError(404, "Deal not found");

    const result = await dealsService.update(deal_id, title, amount, status, deadline, client_id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (req, res, next) => {
  try {
    const { id: deal_id } = req.deal;
    if (!deal_id) throw createError(404, "Deal not found");

    await dealsService.deleteOne(deal_id);
    res.status(200).json({ message: "Deal deleted" });
  } catch (error) {
    next(error);
  }
};
