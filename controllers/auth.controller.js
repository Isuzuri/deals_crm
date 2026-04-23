const createError = require("../helpers/createError");
const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) throw createError(400, "Invalid fields");

    const result = await authService.register(email, password, username);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw createError(400, "Invalid fields");

    const { accessToken } = await authService.login(email, password);
    return res.status(200).json({ message: "Login successfully", data: { token: accessToken } });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
