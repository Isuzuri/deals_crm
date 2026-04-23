const createError = require("../helpers/createError");
const db = require("../models");
const { Deal } = db;

const getDeal = async (req, res, next) => {
  const id = await req.params.id;
  if (!id) throw createError(400, "No id");

  const deal = await Deal.findByPk(id);
  if (!deal) throw createError(404, "Deal not found");

  req.deal = deal;
  next();
};

module.exports = getDeal;
