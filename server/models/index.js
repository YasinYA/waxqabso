const mongoose = require("mongoose");
const dbConfig = require("../config.js");

mongoose.connect(dbConfig.databaseUrl, { useNewUrlParser: true });

module.exports = mongoose.connection;
