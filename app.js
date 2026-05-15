import express from "express";
import { sequelize } from "./models/index.js";
import router from "./routes/routes.js";
import authenticateToken from "./middleware/authenticateToken.js";
import auth from "./routes/auth.routes.js";
import errorHandler from "./middleware/errorHandler.js";

import AdminJS from "adminjs";
import * as AdminJSSequelize from '@adminjs/sequelize'
import { buildAuthenticatedRouter } from "@adminjs/express";
import { ComponentLoader } from "adminjs";
import db from "./models/index.js";


const app = express();
app.use(express.json());

const { User, Deal, Client, Comment } = db;

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database
})
const componentLoader = new ComponentLoader();
const options = {
  componentLoader,
  rootPath: "/admin",
  resources: [User, Deal, Client, Comment],
  databases: [],
};
const admin = new AdminJS(options);
const adminRouter = buildAuthenticatedRouter(
  admin,
  {
    cookiePassword: process.env.COOKIE_SECRET,
    cookieName: "adminjs",
    authenticate: async (email, password) => {
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        return { email };
      }
      return null;
    },
  },
  null,
  {
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: true,
    resave: true,
  },
);
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
