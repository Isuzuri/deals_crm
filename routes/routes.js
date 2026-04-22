const express = require("express");
const router = express.Router();
const permitRoles = require("../middleware/permitRoles");
const clients = require("./clients.routes");

router.use('/clients', clients)

router.get("/me", (req, res) => {
  return res.json({ user: req.user });
});

router.get("/admin", permitRoles("admin"), (req, res) => {
  return res.json({ message: "Admin area", user: req.user });
});

module.exports = router;