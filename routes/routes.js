import express from "express";
import permitRoles from "../middleware/permitRoles.js";
import clients from "./clients.routes.js";
import deals from "./deals.router.js";
import users from "./users.routes.js";

const router = express.Router();

router.use("/clients", clients);
router.use("/deals", deals);
router.use("/users", users);

router.get("/me", (req, res) => {
  return res.json({ user: req.user });
});

router.get("/admin", permitRoles("admin"), (req, res) => {
  return res.json({ message: "Admin area", user: req.user });
});

export default router;
