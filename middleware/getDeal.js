const createError = require("../helpers/createError");
const db = require("../models");
const { Deal } = db;

const getDeal = async (req, res, next) => {
  const deal_id = req.params.deal_id;
  if (!deal_id) throw createError(400, "Bad request");

  const deal = await Deal.findByPk(id);
  if (!deal) throw createError(404, "Deal not found");

  req.deal = deal;
  next();
};

module.exports = getDeal;
