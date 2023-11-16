const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
module.exports = function () {
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("Connected to database..."))
    .catch(() => console.log("couldn't connect to db"));
};
