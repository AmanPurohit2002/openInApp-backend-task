const mongoose = require("mongoose");

const connectToDb = (url) => {
  try {
    mongoose.connect(url);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;

  dbConnection.once("open", (_) => {
    console.log("Database connected Successfully ");
  });

  dbConnection.on("error", (error) => {
    console.error(`connection error: ${error}`);
  });

  return;
};

module.exports = connectToDb;
