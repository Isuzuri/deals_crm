const Sequelize = require("sequelize");
const process = require("process");
const config = require(__dirname + "/../config/config.js")[process.env.NODE_ENV || "development"];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

module.exports = { sequelize };
