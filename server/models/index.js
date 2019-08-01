const Sequelize = require("sequelize");
const dbConfig = require("../config.js");

const dbConnectionUrl = `postgres://${dbConfig.pgUser}:${dbConfig.pgPassword}@${
    dbConfig.pgHost
}:${dbConfig.pgPort}/${dbConfig.pgDatabase}`;

let sequelize = new Sequelize(dbConnectionUrl, {
    dialect: dbConfig.dialect
});

module.exports = sequelize;
