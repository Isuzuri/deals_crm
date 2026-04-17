const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const saltRounds = 10;

const register = async (email, password, username) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    username,
    role: "manager",
  });

  const accessToken = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

  return { email: newUser.email, username: newUser.username, role: newUser.role, accessToken };
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return "user not found";

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    return { accessToken };
  } else {
    return "invalid credentials";
  }
};

module.exports = { register, login };
