const createError = require("../helpers/createError");
const usersService = require("../services/users.service");

const create = async (req, res, next) => {
  try {
    const { email, password, username, role } = req.body;
    if (!email || !password || !username) throw createError(400, "Bad request");
    if (role && !["admin", "manager"].includes(role)) throw createError(400, "Invalid role");

    const result = await usersService.create(email, password, username, role);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { search, page, pageSize, sortBy, order } = req.query;
    const result = await usersService.getAll(search, page, pageSize, sortBy, order);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw createError(404, "User not found");

    const result = await usersService.getOne(id);
    if (!result) throw createError(404, "User not found");

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw createError(404, "User not found");

    const { email, username, role, password } = req.body;
    if (!email || !username || !role) throw createError(400, "Bad request");
    if (!["admin", "manager"].includes(role)) throw createError(400, "Invalid role");

    const user = await usersService.getOne(id);
    if (!user) throw createError(404, "User not found");

    const result = await usersService.update(id, email, username, role, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw createError(404, "User not found");

    const user = await usersService.getOne(id);
    if (!user) throw createError(404, "User not found");

    await usersService.deleteOne(id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

const getDealsByUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw createError(404, "User not found");

    const user = await usersService.getOne(id);
    if (!user) throw createError(404, "User not found");

    const { page, pageSize, sortBy, order } = req.query;
    const result = await usersService.getDealsByUser(id, page, pageSize, sortBy, order);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, getOne, update, deleteOne, getDealsByUser };
