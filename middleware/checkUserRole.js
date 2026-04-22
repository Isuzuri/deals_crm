const checkUserRole = (req, res, next) => {
  const userRole = req.user.role;
  if (userRole === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access Denied: Not enough permission" });
  }
};

module.exports = checkUserRole