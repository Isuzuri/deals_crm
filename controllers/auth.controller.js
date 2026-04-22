const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await authService.register(email, password, username);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const { accessToken } = await authService.login(email, password);
    return res.status(200).json({ message: "Login successfully", data: { token: accessToken } });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { register, login };
