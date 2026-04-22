const clientsService = require("../services/clients.service");

const create = async (req, res, next) => {
  try {
    const { name, email, phone, company } = req.body;
    if (!name || !email || !phone || !company) throw Error("Invalid fields");

    const manager_id = req.user.userId;
    if (!manager_id) throw Error("Manager not found");

    const result = await clientsService.create(name, email, phone, company, manager_id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { search, page, pageSize, sortBy, order } = req.query;
    const result = await clientsService.getAll(search, page, pageSize, sortBy, order);
    res.status(200).json(result)
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll };
