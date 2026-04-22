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
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = req.id;
    if (!id) throw Error("Client not found");

    const result = await clientsService.getOne(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.id;
    if (!id) throw Error("Client not found");

    const { name, email, phone, company, status } = req.body;
    if (!name || !email || !phone || !company || !status) throw Error("Invalid fields");
    if (status !== "lead" || status !== "active" || status !== "inactive") throw Error("Invalid deal status");

    const result = await clientsService.update(id, name, email, phone, company, status);
    res.send(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
    try {
        const id = req.id
        if (!id) throw Error("Client not found");

        await clientsService(id)
        res.status(200)
    } catch (error) {
        next (error)
    }
}

module.exports = { create, getAll, getOne, update, deleteOne };
