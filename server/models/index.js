const mongoose = require("mongoose");
const dbConfig = require("../config.js");

mongoose.connect(dbConfig.databaseUrl, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

module.exports = mongoose.connection;
