const express = require("express");
const { sequelize } = require("./models");
const router = require("./routes/routes");

const app = express();
app.use(express.json())
app.use(router)

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
