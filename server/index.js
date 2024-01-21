const express = require("express");
const cors = require("cors");
const routes = require("./router/routes");
const connectToDb = require("./config/db");
const app = express();
const bodyParser=require('body-parser');
require("dotenv").config();
require('./cronJob/cron-job');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

connectToDb(process.env.MONGODB_URL);

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
