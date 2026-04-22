const express = require("express");
const { sequelize } = require("./models");
const router = require("./routes/routes");

const authenticateToken = require('./middleware/authenticateToken');
const auth = require("./routes/auth.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json())

// Public Routes
app.use('/auth', auth)
// Middleware
app.use(authenticateToken)
// Private Routes
app.use(router)
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Postgres connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Postgress connection error:", error);
  }
};

start();
