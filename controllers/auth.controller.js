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
    const result = await authService.login(email, password);
    if (result.accessToken) {
      res.status(200).json({ message: "Login successfully", data: { token: result.accessToken } });
      return
    }
    switch (result) {
      case "invalid credentials":
        res.status(401).json({ message: "Invalid Credentials" });
        break;
      case "user not found":
        res.status(404).json({ message: "User not found" });
        break;
      default:
        res.status(500).json({ message: "Something went wrong" });
        break;
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { register, login };
