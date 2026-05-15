import createError from "../helpers/createError.js";
import db from "../models/index.js";

const { Deal, Client } = db;

const getDeal = async (req, res, next) => {
  const deal_id = req.params.deal_id;
  if (!deal_id) throw createError(400, "Bad request");

  const deal = await Deal.findByPk(deal_id, { include: [{ model: Client, attributes: ["manager_id"] }] });
  if (!deal) throw createError(404, "Deal not found");

  const { id, role } = req.user;
  if (id !== deal.Client.manager_id && role !== "admin") throw createError(404, "Deal not found");

  req.deal = deal;
  next();
};

export default getDeal;
