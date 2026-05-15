import { ComponentLoader } from "adminjs";
import db from "../models/index.js";

const componentLoader = new ComponentLoader();
const { User, Deal, Client, Comment } = db;
export const options = {
  componentLoader,
  rootPath: "/admin",
  resources: [User, Deal, Client, Comment],
  databases: [],
};
