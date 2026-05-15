import express from "express";
import { sequelize } from "./models/index.js";
import router from "./routes/routes.js";
import authenticateToken from "./middleware/authenticateToken.js";
import auth from "./routes/auth.routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

// Public Routes
app.use("/auth", auth);
// Middleware
app.use(authenticateToken);
// Private Routes
app.use(router);
app.use(errorHandler);

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
