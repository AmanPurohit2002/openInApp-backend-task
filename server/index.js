const express = require("express");
const cors = require("cors");
const routes = require("./router/routes");
const connectToDb = require("./config/db");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

connectToDb(process.env.MONGODB_URL);

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
