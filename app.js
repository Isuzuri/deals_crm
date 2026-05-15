import express from "express";
import { sequelize } from "./models/index.js";
import router from "./routes/routes.js";
import authenticateToken from "./middleware/authenticateToken.js";
import auth from "./routes/auth.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import { admin } from "./admin_panel/index.js";
import { adminRouter } from "./admin_panel/admin.router.js";

const app = express();
app.use(express.json());

// Admin panel
app.use(admin.options.rootPath, adminRouter);
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

    if (process.env.NODE_ENV === "production") {
      await admin.initialize();
    } else {
      admin.watch();
    }

    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
      console.log(`AdminJS available at http://localhost:${process.env.PORT}${admin.options.rootPath}`);
    });
  } catch (error) {
    console.error("Postgress connection error:", error);
  }
};

start();
