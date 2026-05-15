import express from "express";
import * as authController from "../controllers/auth.controller.js";

const auth = express.Router();

auth.post("/register", authController.register);
auth.post("/login", authController.login);

export default auth;
