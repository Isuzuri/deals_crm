const createError = require("../helpers/createError");
const dealsService = require("../services/deals.service");

const create = async (req, res, next) => {
  try {
    const { title, amount, client_id } = req.body;
    if (!title || !amount || !client_id) throw createError(400, "Bad request");

    const result = await dealsService.create(title, amount, client_id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { search, page, pageSize, sortBy, order } = req.query;
    const result = await dealsService.getAll(search, page, pageSize, sortBy, order);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const result = req.deal;
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { title, amount, status, deadline, client_id } = req.body;
    if (!title || !amount || !status || !deadline || !client_id) throw createError(400, "Bad request");

    const deal = req.deal;
    if (!deal) throw createError(404, "Deal not found");

    const result = await dealsService.update(deal.id, title, amount, status, deadline, client_id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const deal = req.deal;
    if (!deal) throw createError(404, "Deal not found");

    await dealsService.deleteOne(deal.id);
    res.status(200).json({ message: "Deal deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, getOne, update, deleteOne };
