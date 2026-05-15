
import { buildAuthenticatedRouter } from "@adminjs/express";
import { admin } from "./index.js";

export const adminRouter = buildAuthenticatedRouter(
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
