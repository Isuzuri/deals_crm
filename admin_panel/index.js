import AdminJS from "adminjs";
import * as AdminJSSequelize from "@adminjs/sequelize";

import { options } from "./config.js";

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

export const admin = new AdminJS(options);
