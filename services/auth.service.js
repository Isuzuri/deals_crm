import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const saltRounds = 10;

export const register = async (email, password, username) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    username,
    role: "manager",
  });

  const accessToken = jwt.sign(
    { id: newUser.id, email: newUser.email, username: newUser.username, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  return { email: newUser.email, username: newUser.username, role: newUser.role, accessToken };
};

export const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Invalid credentials");

  const accessToken = jwt.sign(
    { id: user.id, email: user.email, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  return { accessToken };
};
